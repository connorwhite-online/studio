import React from 'react';
import * as Three from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper } from '@react-three/drei';
import { Model } from './model';

const Scene: React.FC = () => {
  return (
    <Canvas style={{ width: "100dvw", height: "100dvh", zIndex: 98}}>
        <OrbitControls />
        <GizmoHelper />
        <ambientLight intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model/>
    </Canvas>
  );
};

export default Scene;
