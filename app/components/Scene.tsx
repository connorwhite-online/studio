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
  const materialRef = useRef<any>(null);
  const [isPressed, setIsPressed] = useState(false);
  
  // Create a spring animation for the initial scale
  const initialProps = useSpring({
    from: { scale: 0 },
    to: { scale: 1.5 },
    config: { mass: 4, tension: 110, friction: 22 }
  });
  
  // Create a spring animation for the interaction recoil effect
  const interactionProps = useSpring({
    scale: isPressed ? 0.8 : 1.0, // Scale down when pressed
    distort: isPressed ? 0.8 : 0.4, // Increase distortion when pressed
    speed: isPressed ? 3 : 1, // Faster animation when pressed
    colorR: isPressed ? 1.0 : 1.0, // Red component
    colorG: isPressed ? 0.6 : 1.0, // Green component (reduce when pressed)
    colorB: isPressed ? 0.6 : 1.0, // Blue component (reduce when pressed)
    config: { 
      mass: 1, 
      tension: 300, 
      friction: 10 
    }
  });
  
  // Animation with useFrame hook
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    
    // Update material properties based on spring values
    if (materialRef.current) {
      materialRef.current.distort = interactionProps.distort.get();
      materialRef.current.speed = interactionProps.speed.get();
      materialRef.current.color.setRGB(
        interactionProps.colorR.get(),
        interactionProps.colorG.get(),
        interactionProps.colorB.get()
      );
    }
  });

  const handlePointerDown = () => {
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };
  
  return (
    <a.group scale={initialProps.scale}>
      <a.group scale={interactionProps.scale}>
        <Icosahedron 
          args={[0.8, 16]} 
          ref={meshRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp} // Reset if pointer leaves while pressed
        >
          <MeshDistortMaterial
            ref={materialRef}
            color="#ffffff"
            attach="material"
            distort={0.4}
            speed={1}
            wireframe={true}
            emissive="#4080ff"
            emissiveIntensity={0.4}
          />
        </Icosahedron>
      </a.group>
    </a.group>
  );
};

// Main Scene component
const Scene: React.FC = () => {
  return (
    <div className={styles.sceneContainer}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AmorphousSphere />
      </Canvas>
    </div>
  );
};

export default Scene; 