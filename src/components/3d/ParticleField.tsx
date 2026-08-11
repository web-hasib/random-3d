"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useMousePosition } from "../../hooks/useMousePosition";

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useMousePosition();

  // Create 2000 particles
  const count = 2000;
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Sphere coordinate distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 0.5; // Radius between 2.0 and 2.5

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return [pos, orig];
  }, []);

  // GSAP ScrollTrigger to morph particles based on scroll
  useEffect(() => {
    const trigger = gsap.to(pointsRef.current!.rotation, {
      y: Math.PI * 3,
      x: Math.PI * 1.5,
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Morph the scale of the object on scroll
    const scaleTrigger = gsap.to(pointsRef.current!.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      scaleTrigger.scrollTrigger?.kill();
    };
  }, []);

  // Frame loop for mouse hover physics and auto-rotation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!pointsRef.current) return;

    // Default rotation
    pointsRef.current.rotation.z = time * 0.05;

    // React to mouse movement
    const targetX = mouse.x * 0.8;
    const targetY = mouse.y * 0.8;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.1;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.1;

    // Access particle coordinates and add organic wave simulation
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (posAttr) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Wave physics based on distance and math functions
        const wave = Math.sin(time * 2 + originalPositions[i3] * 2) * 0.08;
        posAttr.setX(i, originalPositions[i3] + wave);
        posAttr.setY(i, originalPositions[i3 + 1] + wave);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c084fc"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
