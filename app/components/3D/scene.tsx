import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './model';
import { Environment } from '@react-three/drei';

const Scene: React.FC = () => {

  return (
    <Canvas 
        style={{ width: "100dvw", height: "100dvh", zIndex: 98}}
        camera={{fov: 75, position: [0, 0, 5]}}
    >
        <Model />
        <Environment preset="studio" environmentIntensity={0.5}/>
    </Canvas>
  );
};

export default Scene;
