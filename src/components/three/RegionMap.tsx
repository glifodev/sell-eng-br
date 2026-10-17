"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import geo from "@/content/geo/brasil-uf.json";
import { BASE, destinations } from "./regionData";

/**
 * Mapa wireframe da área de atuação (Norte e Nordeste), no mesmo traço dos modelos de MEF:
 * contornos dos estados coloridos pela distância até a base em São Luís (âmbar perto → azul longe),
 * graticulado ao fundo, Maranhão em relevo e rotas animadas partindo da sede.
 */

type UF = { uf: string; r: "N" | "NE" | "BR"; rings: [number, number][][] };

const LON0 = -50;
const LAT0 = -7;
const K = 0.3;

const proj = (lon: number, lat: number, y = 0) => new THREE.Vector3((lon - LON0) * K, y, -(lat - LAT0) * K);

const ramp = ["#f27a00", "#f2c200", "#58c2b4", "#2f8fc4", "#1d4f80"].map((c) => new THREE.Color(c));
function colorByDistance(lon: number, lat: number) {
  const d = Math.hypot(lon - BASE[0], lat - BASE[1]); // graus
  const v = THREE.MathUtils.clamp(d / 22, 0, 0.999) * (ramp.length - 1);
  const i = Math.floor(v);
  return ramp[i].clone().lerp(ramp[i + 1], v - i);
}

const LABELS = new Set(["Belém", "Manaus", "Fortaleza", "Recife", "Salvador"]);

function buildStates() {
  const hi: number[] = [];
  const hiCol: number[] = [];
  const lo: number[] = [];
  const ma: number[] = [];
  for (const s of geo as UF[]) {
    for (const ring of s.rings) {
      for (let i = 0; i < ring.length - 1; i++) {
        const [ax, ay] = ring[i];
        const [bx, by] = ring[i + 1];
        const a = proj(ax, ay);
        const b = proj(bx, by);
        if (s.r === "BR") {
          lo.push(a.x, a.y, a.z, b.x, b.y, b.z);
          continue;
        }
        hi.push(a.x, a.y, a.z, b.x, b.y, b.z);
        const ca = colorByDistance(ax, ay);
        const cb = colorByDistance(bx, by);
        hiCol.push(ca.r, ca.g, ca.b, cb.r, cb.g, cb.b);
        if (s.uf === "MA") {
          // Maranhão em relevo: contorno elevado + montantes verticais
          const h = 0.22;
          ma.push(a.x, h, a.z, b.x, h, b.z);
          if (i % 14 === 0) ma.push(a.x, 0, a.z, a.x, h, a.z);
        }
      }
    }
  }
  const mk = (arr: number[], col?: number[]) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
    if (col) g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    return g;
  };
  return { hi: mk(hi, hiCol), lo: mk(lo), ma: mk(ma) };
}

function buildGraticule() {
  const pts: number[] = [];
  for (let lon = -75; lon <= -30; lon += 5)
    for (let lat = 6; lat > -20; lat -= 1) {
      const a = proj(lon, lat, -0.02), b = proj(lon, lat - 1, -0.02);
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  for (let lat = 5; lat >= -20; lat -= 5)
    for (let lon = -75; lon < -30; lon += 1) {
      const a = proj(lon, lat, -0.02), b = proj(lon + 1, lat, -0.02);
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

const ARC_N = 64;
function arcPoints(lon: number, lat: number) {
  const a = proj(BASE[0], BASE[1], 0.22);
  const b = proj(lon, lat, 0);
  const h = 0.35 + a.distanceTo(b) * 0.28;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= ARC_N; i++) {
    const t = i / ARC_N;
    const p = a.clone().lerp(b, t);
    p.y += Math.sin(Math.PI * t) * h;
    pts.push(p);
  }
  return pts;
}

function Arc({ lon, lat, offset }: { lon: number; lat: number; offset: number }) {
  const pulse = useRef<THREE.Line>(null);
  const { base, moving } = useMemo(() => {
    const pts = arcPoints(lon, lat);
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    return { base: g, moving: g.clone() };
  }, [lon, lat]);
  const baseLine = useMemo(() => new THREE.Line(base, new THREE.LineBasicMaterial({ color: "#2f8fc4", transparent: true, opacity: 0.35 })), [base]);
  const pulseLine = useMemo(() => new THREE.Line(moving, new THREE.LineBasicMaterial({ color: "#2ac0ea", transparent: true, opacity: 0.95 })), [moving]);

  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime * 0.35 + offset) % 1.4) / 1.4; // pausa entre ciclos
    const len = 14;
    const start = Math.floor(t * (ARC_N + len)) - len;
    const s = Math.max(0, start);
    const e = Math.min(ARC_N + 1, start + len);
    pulseLine.geometry.setDrawRange(s, Math.max(0, e - s));
  });

  return (
    <>
      <primitive object={baseLine} />
      <primitive object={pulseLine} ref={pulse} />
    </>
  );
}

function Marker({ lon, lat, label, home = false }: { lon: number; lat: number; label?: string; home?: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  const p = proj(lon, lat, home ? 0.22 : 0);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime * 0.8) % 1;
    ring.current.scale.setScalar(1 + t * (home ? 5 : 2.5));
    (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.7;
  });
  return (
    <group position={p}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[home ? 0.07 : 0.04, 24]} />
        <meshBasicMaterial color={home ? "#2ac0ea" : "#9fcdf2"} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[home ? 0.08 : 0.05, home ? 0.1 : 0.06, 32]} />
        <meshBasicMaterial color={home ? "#2ac0ea" : "#9fcdf2"} transparent />
      </mesh>
      {home && (
        <line>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0, 0, 0.9, 0]), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#2ac0ea" />
        </line>
      )}
      {label && (
        <Html position={[0, home ? 1.0 : 0.12, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <span
            className={`block whitespace-nowrap font-mono uppercase ${
              home ? "bg-signal px-2 py-1 text-[10px] tracking-[0.14em] text-abyss" : "text-[9px] tracking-[0.12em] text-white/70"
            }`}
          >
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const { hi, lo, ma } = useMemo(() => buildStates(), []);
  const grat = useMemo(() => buildGraticule(), []);
  const center = useMemo(() => proj(-50.5, -6.5), []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, Math.sin(t * 0.15) * 0.08 + state.pointer.x * 0.1, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.0 + state.pointer.y * 0.05, 0.04);
  });

  return (
    <group ref={group}>
      <group position={[-center.x, 0, -center.z]}>
        <lineSegments geometry={grat}>
          <lineBasicMaterial color="#1d4f80" transparent opacity={0.22} />
        </lineSegments>
        <lineSegments geometry={lo}>
          <lineBasicMaterial color="#1268c9" transparent opacity={0.28} />
        </lineSegments>
        <lineSegments geometry={hi}>
          <lineBasicMaterial vertexColors transparent opacity={0.95} />
        </lineSegments>
        <lineSegments geometry={ma}>
          <lineBasicMaterial color="#2ac0ea" transparent opacity={0.85} />
        </lineSegments>
        {destinations.map((d, i) => (
          <Arc key={d.name} lon={d.lon} lat={d.lat} offset={i * 0.37} />
        ))}
        {destinations.map((d) => (
          <Marker key={d.name} lon={d.lon} lat={d.lat} label={LABELS.has(d.name) ? d.name : undefined} />
        ))}
        <Marker lon={BASE[0]} lat={BASE[1]} label="São Luís · Sede" home />
      </group>
    </group>
  );
}

/** Afasta a câmera em painéis estreitos para a região inteira caber no quadro. */
function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const f = THREE.MathUtils.clamp(1.9 / aspect, 1, 2.6);
    camera.position.set(0, 9.2 * f, 7.4 * f);
    camera.lookAt(0, -0.3, 0.5);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

export default function RegionMap({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={[1, 2]}
      camera={{ position: [0, 9.2, 7.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <CameraRig />
      <Scene />
    </Canvas>
  );
}
