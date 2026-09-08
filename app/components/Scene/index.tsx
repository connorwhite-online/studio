'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
import styles from './Scene.module.css';

const POINT_COUNT = 16000;

const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uPointSize;

  attribute float aSeed;

  void main() {
    vec3 point = position;
    float time = uTime * 0.35;

    float deformation =
      sin(point.x * 4.1 + time) *
      sin(point.y * 3.7 - time * 0.8) *
      sin(point.z * 4.3 + time * 0.6);
    deformation += sin((point.x + point.y + point.z) * 5.2 - time) * 0.35;

    point *= 1.0 + deformation * 0.13 + (aSeed - 0.5) * 0.025;

    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uPointSize * uPixelRatio * (5.0 / -viewPosition.z);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;

  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.32, 0.5, distanceFromCenter);

    if (distanceFromCenter > 0.5) discard;
    gl_FragColor = vec4(uColor, alpha * 0.78);
  }
`;

const AmorphousPointCloud = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3);
    const seeds = new Float32Array(POINT_COUNT);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < POINT_COUNT; index += 1) {
      const y = 1 - (index / (POINT_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const angle = goldenAngle * index;
      const radius = 0.8;

      positions[index * 3] = Math.cos(angle) * radiusAtY * radius;
      positions[index * 3 + 1] = y * radius;
      positions[index * 3 + 2] = Math.sin(angle) * radiusAtY * radius;
      seeds[index] = (index * 0.61803398875) % 1;
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return bufferGeometry;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uPointSize: { value: 1.35 },
      uColor: { value: new THREE.Color('#5278ff') },
    }),
    []
  );
  
  // Spring animation for the initial scale
  const initialProps = useSpring({
    from: { scale: 0 },
    to: { scale: 1.5 },
    config: { mass: 4, tension: 110, friction: 22 }
  });

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.x = elapsedTime * 0.05;
      pointsRef.current.rotation.y = elapsedTime * 0.1;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime;
      materialRef.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    }
  });
  
  return (
    <a.group scale={initialProps.scale}>
      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </a.group>
  );
};

const Scene: React.FC = () => {
  return (
    <div className={styles.sceneContainer}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <AmorphousPointCloud />
      </Canvas>
    </div>
  );
};

export default Scene; 