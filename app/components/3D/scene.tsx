import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './model';
import { Environment, Html, useProgress } from '@react-three/drei';
import Intro from './intro';

function Loader() {
  const { progress } = useProgress()
  return <Html center position={[0, -2.5, 0]}>
    <h1 className='introCopy'>{progress.toFixed(2)}%</h1>
    </Html>
}

const Scene: React.FC = () => {

  return (
    <>
    <Intro />
    <Canvas 
        style={{ width: "100dvw", height: "100dvh", zIndex: 98, position: 'absolute'}}
        camera={{fov: 75, position: [0, 0, 5]}}
    >
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <Environment preset="studio" environmentIntensity={0.5}/>
    </Canvas>
    </>
  );
};

export default Scene;
