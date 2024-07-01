import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './model';
import { Environment, Html, useProgress } from '@react-three/drei';
import { DoubleSide } from 'three';

function Loader() {
  const { progress } = useProgress()
  return <Html center position={[0, -2.5, 0]}>
    <h1 className='introCopy'>{progress.toFixed(2)}%</h1>
    </Html>
}

const Scene: React.FC = () => {

  return (
    <Canvas 
        style={{ width: "100dvw", height: "100dvh", zIndex: 98}}
        camera={{fov: 75, position: [0, 0, 5]}}
    >
        <Suspense fallback={<Loader />}>
          <Model />
          <Html 
          as='h1'
          center
          position={[0, -2.5, 0]}
          className='introCopy'
          style={{textWrap: 'nowrap'}}
          >
            Designer &#38; Engineer
          </Html>
        </Suspense>
        <Environment preset="studio" environmentIntensity={0.5}/>
    </Canvas>
  );
};

export default Scene;
