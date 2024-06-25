import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './model';
import { Environment, Html, useProgress } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress()
  return <Html center>Model Loaded {progress}%</Html>
}

const Scene: React.FC = () => {

  return (
    <Canvas 
        style={{ width: "100dvw", height: "100dvh", zIndex: 98}}
        camera={{fov: 75, position: [0, 0, 5]}}
    >
        <Suspense fallback={<Loader />}>
        <Model />
        </Suspense>
        <Environment preset="studio" environmentIntensity={0.5}/>
    </Canvas>
  );
};

export default Scene;
