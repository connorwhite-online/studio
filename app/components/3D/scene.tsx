import React from 'react';
import * as Three from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper } from '@react-three/drei';
import { Model } from './model';
import { useSpring, a } from '@react-spring/three';

const Scene: React.FC = () => {

    const  groupRotation  = useSpring({
        to: {
            groupRotation: Math.PI / 2
        },
        config: {
            mass: 5,
            tension: 150,
            friction: 50,
        },
    });

  return (
    <Canvas 
        style={{ width: "100dvw", height: "100dvh", zIndex: 98}}
        camera={{fov: 75, position: [0, 0, 5]}}
    >
        {/* <OrbitControls /> */}
        <GizmoHelper />
        <ambientLight intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* <a.group  rotation-y={groupRotation}> */}
            <Model />
        {/* </a.group> */}
    </Canvas>
  );
};

export default Scene;
