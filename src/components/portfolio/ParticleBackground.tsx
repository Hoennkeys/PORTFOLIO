import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PointMaterial } from "@react-three/drei";

function ParticleSystem({ count = 260, scrollYRef }: { count?: number; scrollYRef: React.RefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particles inside a bounding box
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Stark Cyberpunk/Hard-Tech Neon Colors
    const palette = [
      new THREE.Color("#00f0ff"), // Cyber Cyan
      new THREE.Color("#ff007f"), // Hot Neon Pink
      new THREE.Color("#39ff14"), // Acid Neon Green
      new THREE.Color("#a855f7"), // Sharp Violet
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      // Assign random color from cyberpunk palette
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Regular slow drift rotation
    pointsRef.current.rotation.y = time * 0.015;

    // React to pointer coordinates
    const targetX = state.pointer.x * 0.12;
    const targetY = state.pointer.y * 0.12;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05;

    // High frequency math to trigger intermittent glitch scanline jumps
    const glitchFreq = time * 3.5;
    const glitchTrigger = Math.sin(glitchFreq * 1.5) * Math.cos(glitchFreq * 0.8) > 0.92;

    if (glitchTrigger) {
      // Jitter position and scale to simulate digital screen noise / glitch
      pointsRef.current.position.x = (Math.random() - 0.5) * 0.25;
      pointsRef.current.position.y = (Math.random() - 0.5) * 0.25;
      pointsRef.current.scale.setScalar(1.0 + (Math.random() - 0.5) * 0.35);
    } else {
      pointsRef.current.position.x = 0;
      pointsRef.current.position.y = 0;
      pointsRef.current.scale.setScalar(1.0);
    }

    // Scroll-driven camera fly-through in 3D space
    const currentScroll = scrollYRef.current || 0;
    const targetCamZ = 5 - currentScroll * 0.003;
    state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      {/* Drei's PointMaterial creates beautiful circular anti-aliased points */}
      <PointMaterial
        transparent
        vertexColors
        size={0.075}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
      />
    </points>
  );
}

export function ParticleBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{
        background: "radial-gradient(circle at center, transparent 35%, rgba(10, 8, 12, 0.96) 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSystem count={260} scrollYRef={scrollYRef} />
      </Canvas>
    </div>
  );
}
