"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useMousePosition } from "../../hooks/useMousePosition";

export default function CrystalObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  // Morph the scale of the crystal on scroll in sync with particles
  useEffect(() => {
    if (!meshRef.current) return;
    
    const trigger = gsap.to(meshRef.current.scale, {
      x: 0.35,
      y: 0.35,
      z: 0.35,
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Smooth auto-rotation
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.y = time * 0.2;

    // React to normalized mouse movement
    const targetX = mouse.x * 1.5;
    const targetY = mouse.y * 1.5;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;

    // Floating dynamic wave animation (Liquide Glass float effect)
    meshRef.current.position.z = Math.sin(time * 1.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[1.4, 1.4, 1.4]}>
      {/* 3D Icosahedron crystal geometry */}
      <icosahedronGeometry args={[1, 1]} />
      {/* Advanced Liquid Glass material with refraction and transmission */}
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.2}
        thickness={1.5}
        roughness={0.08}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.12}
        anisotropy={0.2}
        distortion={0.3}
        distortionScale={0.4}
        temporalDistortion={0.1}
        clearcoat={1}
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
        color="#e0e7ff"
      />
    </mesh>
  );
}
