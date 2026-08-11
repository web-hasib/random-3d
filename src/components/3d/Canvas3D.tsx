"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import CrystalObject from "./CrystalObject";

interface Canvas3DProps {
  showCrystal?: boolean;
}

export default function Canvas3D({ showCrystal = true }: Canvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        <ParticleField />
        {showCrystal && <CrystalObject />}
      </Canvas>
    </div>
  );
}
