import * as THREE from "three";

/**
 * Modelos de engenharia em wireframe com "mapa de tensões" fictício
 * (rampa azul → ciano → âmbar → laranja), estilo pós-processador de MEF.
 * Cada modelo devolve segmentos [a, b] com intensidade de tensão 0..1 em cada ponta.
 */

export type WireModelName = "hull" | "padeye" | "mooring" | "jacket" | "crane";

type V = [number, number, number];
type Seg = { a: V; b: V; sa: number; sb: number };

const ramp = ["#1d4f80", "#2f8fc4", "#58c2b4", "#f2c200", "#f27a00"].map((c) => new THREE.Color(c));

function colorAt(s: number) {
  const v = THREE.MathUtils.clamp(s, 0, 0.999) * (ramp.length - 1);
  const i = Math.floor(v);
  return ramp[i].clone().lerp(ramp[i + 1], v - i);
}

const gauss = (d2: number, w: number) => Math.exp(-d2 / w);

/** Subdivide uma barra em n trechos, com tensão avaliada por ponto. */
function bar(out: Seg[], a: V, b: V, stress: (p: V) => number, n = 8) {
  let prev = a;
  let sp = stress(a);
  for (let k = 1; k <= n; k++) {
    const t = k / n;
    const p: V = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    const s = stress(p);
    out.push({ a: prev, b: p, sa: sp, sb: s });
    prev = p;
    sp = s;
  }
}

/* --------------------------------- casco --------------------------------- */

function hull(): Seg[] {
  const L = 5, B = 1.55, T = 1.7;
  const half = (u: number, t: number) => {
    const bow = Math.max(u, 0), stern = Math.max(-u, 0);
    const plan = (1 - Math.pow(bow, 2.1)) * (1 - 0.35 * Math.pow(stern, 5));
    const section = Math.pow(Math.max(0, 1 - Math.pow(t, 2.6)), 0.55);
    return Math.max(0, B * plan * section * (1 - bow * 0.45 * t));
  };
  const stress = (u: number, t: number) =>
    0.15 +
    0.7 * gauss((u - 0.05) ** 2, 0.18) * (0.35 + 0.65 * t) +
    0.55 * Math.exp(-(((u + 0.5) ** 2) / 0.02 + ((t - 0.8) ** 2) / 0.05)) +
    0.35 * Math.exp(-(((u - 0.7) ** 2) / 0.03 + t ** 2 / 0.08));
  const pt = (u: number, t: number, side: number): V => [u * L, -t * T + T / 2, side * half(u, t)];
  const out: Seg[] = [];
  const push = (u0: number, t0: number, u1: number, t1: number, side: number) =>
    out.push({ a: pt(u0, t0, side), b: pt(u1, t1, side), sa: stress(u0, t0), sb: stress(u1, t1) });

  for (let s = 0; s <= 22; s++) {
    const u = -0.98 + (s / 22) * 1.96;
    for (const side of [1, -1]) for (let k = 0; k < 18; k++) push(u, k / 18, u, (k + 1) / 18, side);
    out.push({ a: pt(u, 0, 1), b: pt(u, 0, -1), sa: stress(u, 0), sb: stress(u, 0) });
  }
  for (let w = 0; w <= 8; w++) {
    const t = w / 8;
    for (const side of [1, -1])
      for (let k = 0; k < 60; k++) push(-0.98 + (k / 60) * 1.96, t, -0.98 + ((k + 1) / 60) * 1.96, t, side);
  }
  return out;
}

/* ---------------------------- olhal de içamento ---------------------------- */

function padeye(): Seg[] {
  // chapa do olhal no plano XY, espessura em Z, sobre chapa de reforço (base)
  const R = 1.6; // raio externo do topo
  const r = 0.62; // furo
  const H = 1.8; // altura do centro do furo acima da base
  const W = 2.2; // meia-largura na base
  const th = 0.28;
  const cy = H - 1.6; // centro do furo
  const out: Seg[] = [];

  const yb = -1.6; // base da chapa
  // contorno externo: arco superior (raio R) + flancos retos até a largura W na base.
  // Ponto obtido pela interseção do raio que sai do centro do furo com o contorno.
  const outer = (a: number): [number, number] => {
    const dx = Math.sin(a), dy = Math.cos(a);
    if (dy >= 0) return [dx * R, cy + dy * R];
    const tBase = (yb - cy) / dy;
    const xBase = dx * tBase;
    if (Math.abs(xBase) <= W) return [xBase, yb];
    // flanco: de (sR, cy) até (sW, yb)
    const sgn = Math.sign(dx);
    const fx0 = sgn * R, fx1 = sgn * W;
    // resolve t*dx = fx0 + u*(fx1-fx0), cy + t*dy = cy + u*(yb-cy)
    const det = dx * (yb - cy) - dy * (fx1 - fx0);
    const t = (fx0 * (yb - cy)) / det;
    return [dx * t, cy + dy * t];
  };
  const stress = (x: number, y: number) => {
    // concentração no topo do furo (direção da carga) e nas laterais do furo
    const dx = x, dy = y - cy;
    const d = Math.hypot(dx, dy);
    const ang = Math.atan2(dx, dy);
    const ring = gauss((d - r) ** 2, 0.08);
    return 0.12 + ring * (0.55 + 0.45 * Math.cos(ang) ** 2) + 0.25 * gauss((y - yb) ** 2, 0.15) * gauss(x * x, 2.5);
  };
  const rings = 7, spokes = 36;
  const grid: [number, number][][] = [];
  for (let i = 0; i <= rings; i++) {
    const t = i / rings;
    const row: [number, number][] = [];
    for (let j = 0; j < spokes; j++) {
      const a = (j / spokes) * Math.PI * 2;
      const hx = Math.sin(a) * r, hy = cy + Math.cos(a) * r;
      const [ox, oy] = outer(a);
      // malha refinada perto do furo
      const e = Math.pow(t, 1.6);
      row.push([hx + (ox - hx) * e, hy + (oy - hy) * e]);
    }
    grid.push(row);
  }
  for (const z of [th, -th]) {
    for (let i = 0; i <= rings; i++)
      for (let j = 0; j < spokes; j++) {
        const p = grid[i][j], q = grid[i][(j + 1) % spokes];
        out.push({ a: [p[0], p[1], z], b: [q[0], q[1], z], sa: stress(...p), sb: stress(...q) });
      }
    for (let j = 0; j < spokes; j++)
      for (let i = 0; i < rings; i++) {
        const p = grid[i][j], q = grid[i + 1][j];
        out.push({ a: [p[0], p[1], z], b: [q[0], q[1], z], sa: stress(...p), sb: stress(...q) });
      }
  }
  // espessura no contorno externo e no furo
  for (let j = 0; j < spokes; j += 2)
    for (const i of [0, rings]) {
      const p = grid[i][j];
      out.push({ a: [p[0], p[1], th], b: [p[0], p[1], -th], sa: stress(...p), sb: stress(...p) });
    }
  // chapa de base (reforço) em malha
  const by = yb, bw = 3, bd = 1.6;
  const base = (x: number, z: number) => 0.1 + 0.35 * gauss(x * x, 1.2) * gauss(z * z, 0.3);
  for (let i = 0; i <= 12; i++) {
    const x = -bw + (i / 12) * 2 * bw;
    bar(out, [x, by, -bd], [x, by, bd], (p) => base(p[0], p[2]), 6);
  }
  for (let k = 0; k <= 6; k++) {
    const z = -bd + (k / 6) * 2 * bd;
    bar(out, [-bw, by, z], [bw, by, z], (p) => base(p[0], p[2]), 12);
  }
  // manilha/cabo sugerido saindo do furo
  bar(out, [0, cy + r, 0], [0, cy + 3.2, 0], () => 0.85, 6);
  return out.map((s) => ({ ...s, a: [s.a[0], s.a[1] - 0.4, s.a[2]], b: [s.b[0], s.b[1] - 0.4, s.b[2]] }));
}

/* --------------------------- bóia + amarra + poita --------------------------- */

function mooring(): Seg[] {
  const out: Seg[] = [];
  const R = 1.1;
  const c: V = [-2.4, 2.2, 0];
  // bóia (esfera em latitudes/meridianos)
  const bs = (y: number) => 0.15 + 0.6 * gauss((y - (c[1] - R)) ** 2, 0.25);
  const sph = (lat: number, lon: number): V => [c[0] + R * Math.cos(lat) * Math.cos(lon), c[1] + R * Math.sin(lat), c[2] + R * Math.cos(lat) * Math.sin(lon)];
  for (let i = 1; i < 9; i++) {
    const lat = -Math.PI / 2 + (i / 9) * Math.PI;
    for (let j = 0; j < 28; j++) {
      const a = sph(lat, (j / 28) * Math.PI * 2), b = sph(lat, ((j + 1) / 28) * Math.PI * 2);
      out.push({ a, b, sa: bs(a[1]), sb: bs(b[1]) });
    }
  }
  for (let j = 0; j < 14; j++) {
    const lon = (j / 14) * Math.PI * 2;
    for (let i = 0; i < 18; i++) {
      const a = sph(-Math.PI / 2 + (i / 18) * Math.PI, lon), b = sph(-Math.PI / 2 + ((i + 1) / 18) * Math.PI, lon);
      out.push({ a, b, sa: bs(a[1]), sb: bs(b[1]) });
    }
  }
  // mastro de sinalização
  bar(out, [c[0], c[1] + R, 0], [c[0], c[1] + R + 1.1, 0], () => 0.2, 4);
  // linha d'água
  for (let k = -1; k <= 1; k++) bar(out, [-5.2, c[1] + 0.15, k * 1.6], [5.2, c[1] + 0.15, k * 1.6], () => 0.05, 20);
  // amarra em catenária até a poita
  const p0: V = [c[0], c[1] - R, 0];
  const p1: V = [2.8, -2.6, 0];
  const N = 40;
  let prev = p0;
  for (let k = 1; k <= N; k++) {
    const t = k / N;
    const x = p0[0] + (p1[0] - p0[0]) * t;
    const sag = Math.sin(Math.PI * t) * 1.1;
    const y = p0[1] + (p1[1] - p0[1]) * t - sag;
    const p: V = [x, y, 0];
    const tension = 0.95 - 0.6 * t;
    out.push({ a: prev, b: p, sa: tension + 0.02, sb: tension });
    // elos (marcas transversais)
    if (k % 2 === 0) out.push({ a: [x, y - 0.09, -0.12], b: [x, y + 0.09, 0.12], sa: tension, sb: tension });
    prev = p;
  }
  // poita (bloco de concreto) em malha
  const bx = 2.8, by = -3.3, s = 0.7, h = 0.7;
  const ps = (p: V) => 0.15 + 0.5 * gauss((p[1] - (by + h)) ** 2, 0.2) * gauss((p[0] - bx) ** 2, 0.3);
  for (let i = 0; i <= 4; i++) {
    const t = -s + (i / 4) * 2 * s;
    for (const y of [by, by + h]) {
      bar(out, [bx - s, y, t], [bx + s, y, t], ps, 4);
      bar(out, [bx + t, y, -s], [bx + t, y, s], ps, 4);
    }
  }
  for (const [x, z] of [[-s, -s], [s, -s], [s, s], [-s, s]]) bar(out, [bx + x, by, z], [bx + x, by + h, z], ps, 3);
  // leito marinho
  for (let k = -2; k <= 2; k++) bar(out, [-5.2, by, k * 0.9], [5.2, by, k * 0.9], () => 0.04, 16);
  return out.map((sg) => ({ ...sg, a: [sg.a[0], sg.a[1] - 0.2, sg.a[2]], b: [sg.b[0], sg.b[1] - 0.2, sg.b[2]] }));
}

/* ---------------------- estrutura treliçada (píer/jaqueta) ---------------------- */

function jacket(): Seg[] {
  const out: Seg[] = [];
  const yb = -3.6, yt = 2.6;
  const leg = (sx: number, sz: number, y: number): V => {
    const t = (y - yb) / (yt - yb);
    const w = 2.2 - 0.9 * t;
    return [sx * w, y, sz * w];
  };
  const stress = (p: V) => 0.12 + 0.75 * Math.pow(THREE.MathUtils.clamp((yt - p[1]) / (yt - yb), 0, 1), 2.2) * (0.6 + 0.4 * Math.min(1, Math.abs(p[0]) / 2));
  const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  const levels = [yb, -1.6, 0.2, 1.6, yt];
  for (const [sx, sz] of corners) bar(out, leg(sx, sz, yb), leg(sx, sz, yt), stress, 24);
  for (const y of levels)
    for (let i = 0; i < 4; i++) {
      const [ax, az] = corners[i], [bx, bz] = corners[(i + 1) % 4];
      bar(out, leg(ax, az, y), leg(bx, bz, y), stress, 8);
    }
  // contraventamentos em X em cada face
  for (let l = 0; l < levels.length - 1; l++)
    for (let i = 0; i < 4; i++) {
      const [ax, az] = corners[i], [bx, bz] = corners[(i + 1) % 4];
      bar(out, leg(ax, az, levels[l]), leg(bx, bz, levels[l + 1]), stress, 10);
      bar(out, leg(bx, bz, levels[l]), leg(ax, az, levels[l + 1]), stress, 10);
    }
  // convés
  const dw = 2.4, dy = yt + 0.35;
  for (let i = 0; i <= 8; i++) {
    const t = -dw + (i / 8) * 2 * dw;
    bar(out, [t, dy, -dw], [t, dy, dw], () => 0.18, 6);
    bar(out, [-dw, dy, t], [dw, dy, t], () => 0.18, 6);
  }
  for (const [sx, sz] of corners) bar(out, leg(sx, sz, yt), [sx * 1.3, dy, sz * 1.3], () => 0.25, 2);
  // linha d'água
  const wy = 0.9;
  for (let k = 0; k < 48; k++) {
    const a0 = (k / 48) * Math.PI * 2, a1 = ((k + 1) / 48) * Math.PI * 2;
    out.push({ a: [Math.cos(a0) * 4.4, wy, Math.sin(a0) * 4.4], b: [Math.cos(a1) * 4.4, wy, Math.sin(a1) * 4.4], sa: 0.05, sb: 0.05 });
  }
  return out;
}

/* ------------------------------- guindaste ------------------------------- */

function crane(): Seg[] {
  const out: Seg[] = [];
  // torre treliçada
  const tw = 0.55, y0 = -3.4, y1 = 0.8;
  const ts = (p: V) => 0.15 + 0.55 * THREE.MathUtils.clamp((y1 - p[1]) / (y1 - y0), 0, 1);
  const tc: [number, number][] = [[-tw, -tw], [tw, -tw], [tw, tw], [-tw, tw]];
  for (const [x, z] of tc) bar(out, [x - 1.5, y0, z], [x - 1.5, y1, z], ts, 16);
  for (let l = 0; l <= 7; l++) {
    const y = y0 + (l / 7) * (y1 - y0);
    for (let i = 0; i < 4; i++) {
      const [ax, az] = tc[i], [bx, bz] = tc[(i + 1) % 4];
      bar(out, [ax - 1.5, y, az], [bx - 1.5, y, bz], ts, 3);
      if (l < 7) bar(out, [ax - 1.5, y, az], [bx - 1.5, y + (y1 - y0) / 7, bz], ts, 4);
    }
  }
  // lança treliçada inclinada (flexão máxima perto da raiz)
  const root: V = [-1.5, y1, 0];
  const tip: V = [4.6, 3.4, 0];
  const L = Math.hypot(tip[0] - root[0], tip[1] - root[1]);
  const dir = [(tip[0] - root[0]) / L, (tip[1] - root[1]) / L];
  const nrm = [-dir[1], dir[0]];
  const bs = (p: V) => {
    const along = ((p[0] - root[0]) * dir[0] + (p[1] - root[1]) * dir[1]) / L;
    return 0.12 + 0.85 * Math.pow(1 - THREE.MathUtils.clamp(along, 0, 1), 1.6);
  };
  const boom = (t: number, side: number, up: number): V => {
    const h = 0.42 * (1 - 0.6 * t);
    return [root[0] + dir[0] * L * t + nrm[0] * h * up, root[1] + dir[1] * L * t + nrm[1] * h * up, side * h];
  };
  for (const side of [1, -1]) for (const up of [1, -1]) bar(out, boom(0, side, up), boom(1, side, up), bs, 30);
  for (let k = 0; k <= 14; k++) {
    const t = k / 14;
    const corners = [boom(t, 1, 1), boom(t, -1, 1), boom(t, -1, -1), boom(t, 1, -1)];
    for (let i = 0; i < 4; i++) out.push({ a: corners[i], b: corners[(i + 1) % 4], sa: bs(corners[i]), sb: bs(corners[(i + 1) % 4]) });
    if (k < 14) {
      const n = boom((k + 1) / 14, 1, -1);
      out.push({ a: corners[0], b: n, sa: bs(corners[0]), sb: bs(n) });
    }
  }
  // cabo e carga
  bar(out, tip, [tip[0], -1.4, 0], () => 0.7, 10);
  const c: V = [tip[0], -2.1, 0];
  const cs = 0.6;
  for (const y of [c[1] - cs, c[1] + cs])
    for (const [ax, az, bx, bz] of [[-1, -1, 1, -1], [1, -1, 1, 1], [1, 1, -1, 1], [-1, 1, -1, -1]])
      bar(out, [c[0] + ax * cs, y, az * cs], [c[0] + bx * cs, y, bz * cs], () => 0.3, 3);
  for (const [x, z] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    bar(out, [c[0] + x * cs, c[1] - cs, z * cs], [c[0] + x * cs, c[1] + cs, z * cs], () => 0.3, 3);
    bar(out, [c[0] + x * cs, c[1] + cs, z * cs], [tip[0], -1.4, 0], () => 0.55, 3); // estropos
  }
  return out.map((s) => ({ ...s, a: [s.a[0] - 1.4, s.a[1], s.a[2]], b: [s.b[0] - 1.4, s.b[1], s.b[2]] }));
}

const builders: Record<WireModelName, () => Seg[]> = { hull, padeye, mooring, jacket, crane };

export function buildWireGeometry(name: WireModelName) {
  const segs = builders[name]();
  const pos = new Float32Array(segs.length * 6);
  const col = new Float32Array(segs.length * 6);
  segs.forEach((s, i) => {
    pos.set([...s.a, ...s.b], i * 6);
    const ca = colorAt(s.sa), cb = colorAt(s.sb);
    col.set([ca.r, ca.g, ca.b, cb.r, cb.g, cb.b], i * 6);
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return g;
}

/** Enquadramento por modelo: [rotação inicial x, y], escala, distância da câmera. */
export const framing: Record<WireModelName, { rot: [number, number]; scale: number; spin: number }> = {
  hull: { rot: [0.42, -0.9], scale: 0.9, spin: 0.12 },
  padeye: { rot: [0.25, -0.6], scale: 1.05, spin: 0.18 },
  mooring: { rot: [0.18, -0.35], scale: 0.82, spin: 0.08 },
  jacket: { rot: [0.22, -0.5], scale: 0.78, spin: 0.14 },
  crane: { rot: [0.15, -0.5], scale: 0.88, spin: 0.1 },
};

/** Rótulos e legendas para exibição dos modelos. */
export const modelInfo: Record<WireModelName, { label: string; title: string; text: string }> = {
  hull: {
    label: "Casco",
    title: "Casco · flexão longitudinal",
    text: "Balizas e linhas d’água coloridas por intensidade de tensão: concentração a meia-nau e no fundo, típica da flexão do navio em ondas.",
  },
  padeye: {
    label: "Olhal",
    title: "Olhal de içamento · concentração no furo",
    text: "Malha refinada ao redor do furo, onde a carga da manilha concentra tensões. É aqui que se define espessura, raio e reforço.",
  },
  mooring: {
    label: "Fundeio",
    title: "Bóia, amarra e poita · tração na catenária",
    text: "A tração é máxima junto à bóia e se dissipa ao longo da amarra até a poita, dimensionada para não arrastar no leito.",
  },
  jacket: {
    label: "Píer / jaqueta",
    title: "Estrutura treliçada · esforços na base",
    text: "Pernas e contraventamentos em X com esforços crescentes em direção à base, onde atuam correnteza, maré e cargas do convés.",
  },
  crane: {
    label: "Guindaste",
    title: "Guindaste · momento na raiz da lança",
    text: "Lança treliçada com momento fletor máximo junto à torre; cabo e estropos tracionados pela carga suspensa.",
  },
};
