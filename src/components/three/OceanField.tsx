"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Superfície oceânica em nuvem de pontos — leitura de "batimetria/sonar".
 * Ondas somadas (tipo Gerstner simplificado) calculadas no vertex shader.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vHeight;
  varying float vDepth;

  float wave(vec2 p, vec2 dir, float freq, float speed, float amp) {
    return sin(dot(p, normalize(dir)) * freq + uTime * speed) * amp;
  }

  void main() {
    vec3 pos = position;
    float h = 0.0;
    h += wave(pos.xz, vec2(1.0, 0.3), 0.32, 0.55, 0.55);
    h += wave(pos.xz, vec2(-0.4, 1.0), 0.55, 0.8, 0.28);
    h += wave(pos.xz, vec2(0.7, -0.6), 1.1, 1.25, 0.11);
    h += wave(pos.xz, vec2(-1.0, -0.2), 2.1, 1.7, 0.04);
    // ondulação suave em torno do cursor
    float d = distance(pos.xz, uMouse * vec2(14.0, 6.0) + vec2(0.0, 2.0));
    h += sin(d * 1.6 - uTime * 2.4) * 0.18 * exp(-d * 0.22);
    pos.y += h;
    vHeight = h;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min((2.2 + h * 1.2) * (14.0 / vDepth), 5.5);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uCrest;
  varying float vHeight;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (length(c) > 0.5) discard;
    float crest = smoothstep(0.35, 0.95, vHeight);
    vec3 col = mix(uBase, uCrest, crest);
    float fade = smoothstep(42.0, 8.0, vDepth);
    gl_FragColor = vec4(col, (0.35 + crest * 0.65) * fade);
  }
`;

function Field({ base, crest }: { base: string; crest: string }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const geometry = useMemo(() => {
    const cols = 180;
    const rows = 90;
    const w = 48;
    const d = 32;
    const arr = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let z = 0; z < rows; z++) {
      for (let x = 0; x < cols; x++) {
        arr[i++] = (x / (cols - 1) - 0.5) * w;
        arr[i++] = 0;
        arr[i++] = (z / (rows - 1) - 0.5) * d;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uBase: { value: new THREE.Color(base) },
      uCrest: { value: new THREE.Color(crest) },
    }),
    [base, crest],
  );

  useFrame(({ camera, pointer }, delta) => {
    const m = mat.current;
    if (!m) return;
    const u = m.uniforms;
    u.uTime.value += Math.min(delta, 0.05);
    mouse.current.lerp(pointer, 0.04);
    u.uMouse.value.copy(mouse.current);
    camera.position.set(mouse.current.x * 1.2, 4.2 + mouse.current.y * 0.5, camera.position.z);
    camera.lookAt(0, 0, -4);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function OceanField({ base = "#2f6fa3", crest = "#f2a900", paused = false }: { base?: string; crest?: string; paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 4.2, 14], fov: 50, near: 0.1, far: 80 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={paused ? "never" : "always"}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Field base={base} crest={crest} />
    </Canvas>
  );
}
