"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { buildWireGeometry, framing, type WireModelName } from "./wireModels";

function Model({ name }: { name: WireModelName }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => buildWireGeometry(name), [name]);
  const f = framing[name];

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * f.spin;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, f.rot[0] + state.pointer.y * 0.12, 0.05);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
  });

  return (
    <group ref={group} rotation={[f.rot[0], f.rot[1], 0]} scale={f.scale}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.92} />
      </lineSegments>
    </group>
  );
}

export default function WireModel({ name, paused = false }: { name: WireModelName; paused?: boolean }) {
  return (
    <Canvas frameloop={paused ? "never" : "always"} dpr={[1, 2]} camera={{ position: [0, 1.2, 11], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <Model name={name} />
    </Canvas>
  );
}
