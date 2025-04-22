'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
import styles from './scene.module.css';

// 3D amorphous cloud/sphere component
const AmorphousSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a spring animation for the scale
  const props = useSpring({
    from: { scale: 0 },
    to: { scale: 1.8 },
    config: { mass: 4, tension: 110, friction: 22 }
  });
  
  // Animation with useFrame hook
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <a.group scale={props.scale}>
      <Icosahedron args={[1.2, 16]} ref={meshRef}>
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.4} // Distortion amount
          speed={1} // Animation speed
          wireframe={true}
          emissive="#4080ff"
          emissiveIntensity={0.4}
        />
      </Icosahedron>
    </a.group>
  );
};

// Main Scene component
const Scene: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    console.log("3D Scene component mounted");
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className={styles.sceneContainer}>
     {visible && (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AmorphousSphere />
        </Canvas>
      )}
    </div>
  );
};

export default Scene; 