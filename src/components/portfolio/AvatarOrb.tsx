import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX_SHADER = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normal;
    vPosition = position;
    
    // Smooth wave equation for organic shape deformation
    float wave = sin(position.x * 2.2 + uTime) * cos(position.y * 2.2 + uTime) * sin(position.z * 1.8 + uTime);
    float displacement = wave * 0.14;
    
    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const FRAGMENT_SHADER_INNER = `
  uniform float uTime;
  varying vec3 vNormal;

  void main() {
    // Holographic gradient between violet and pink
    vec3 color1 = vec3(0.48, 0.15, 0.85); // Violet (#7c3aed)
    vec3 color2 = vec3(0.92, 0.28, 0.60); // Pink (#ec4899)
    
    vec3 finalColor = mix(color1, color2, sin(uTime * 0.4) * 0.5 + 0.5);
    
    // Add glowing edge refraction (fresnel)
    float edgeGlow = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    finalColor += vec3(edgeGlow * 0.45);
    
    gl_FragColor = vec4(finalColor, 0.85);
  }
`;

const FRAGMENT_SHADER_OUTER = `
  uniform float uTime;
  varying vec3 vNormal;

  void main() {
    // Glowing neon pink outline
    vec3 color = vec3(0.92, 0.28, 0.60); // Pink (#ec4899)
    
    float edgeGlow = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    vec3 finalColor = color + vec3(edgeGlow * 0.35);
    
    gl_FragColor = vec4(finalColor, 0.45);
  }
`;

function OrbMesh() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  // Initialize shader materials in memo to avoid recreating on every frame
  const innerMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER_INNER,
    transparent: true,
  }), []);

  const outerMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER_OUTER,
    transparent: true,
    wireframe: true,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Update uniforms
    innerMaterial.uniforms.uTime.value = time * 1.6;
    outerMaterial.uniforms.uTime.value = time * 2.2;

    // Rotate meshes
    if (innerRef.current) {
      innerRef.current.rotation.y = time * 0.12;
      innerRef.current.rotation.x = time * 0.06;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -time * 0.06;
      outerRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <group>
      {/* Inner solid glowing core */}
      <mesh ref={innerRef} material={innerMaterial}>
        <sphereGeometry args={[1.15, 64, 64]} />
      </mesh>

      {/* Outer rotating wireframe cage */}
      <mesh ref={outerRef} material={outerMaterial}>
        <sphereGeometry args={[1.35, 32, 32]} />
      </mesh>
    </group>
  );
}

export function AvatarOrb() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <OrbMesh />
      </Canvas>
    </div>
  );
}
