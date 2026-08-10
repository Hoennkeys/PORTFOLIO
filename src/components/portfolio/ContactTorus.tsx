import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TorusMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rotating torus knot
      meshRef.current.rotation.y = time * 0.18;
      meshRef.current.rotation.x = time * 0.08;
      
      // Breathing scale motion
      const scale = 1.0 + Math.sin(time * 1.8) * 0.06;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* 3D TorusKnot geometry for interactive wireframe structure */}
      <torusKnotGeometry args={[1.1, 0.35, 120, 10]} />
      <meshBasicMaterial
        color="#ff007f" // Pink neon wireframe color
        wireframe
        transparent
        opacity={0.32}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function ContactTorus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-65 flex items-center justify-center overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <TorusMesh />
      </Canvas>
    </div>
  );
}
