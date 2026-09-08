'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';
import styles from './Scene.module.css';

const POINT_COUNT = 16000;

const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uPointSize;
  uniform float uIntroProgress;
  uniform float uScatter;
  uniform float uGather;
  uniform vec2 uTouch;

  attribute float aSeed;
  varying float vIntroAlpha;

  float hash(float value) {
    return fract(sin(value) * 43758.5453123);
  }

  void main() {
    vec3 targetPoint = position;
    float time = uTime * 0.35;

    float deformation =
      sin(targetPoint.x * 4.1 + time) *
      sin(targetPoint.y * 3.7 - time * 0.8) *
      sin(targetPoint.z * 4.3 + time * 0.6);
    deformation += sin((targetPoint.x + targetPoint.y + targetPoint.z) * 5.2 - time) * 0.35;

    targetPoint *= 1.0 + deformation * 0.13 + (aSeed - 0.5) * 0.025;

    vec3 scatterDirection = normalize(vec3(
      hash(aSeed * 127.1) - 0.5,
      hash(aSeed * 311.7 + 2.0) - 0.5,
      hash(aSeed * 74.7 + 7.0) - 0.5
    ));
    vec3 startPoint =
      normalize(position + scatterDirection * 0.85) *
      (1.05 + aSeed * 0.55);

    float progress = clamp((uIntroProgress - aSeed * 0.28) / 0.72, 0.0, 1.0);
    float easedProgress = 1.0 - pow(1.0 - progress, 3.0);
    vec3 magneticArc =
      cross(normalize(startPoint), normalize(targetPoint)) *
      sin(progress * 3.14159265) *
      0.22;
    vec3 point = mix(startPoint, targetPoint, easedProgress) + magneticArc;
    vIntroAlpha = smoothstep(0.0, 0.42, progress);

    float touchDistance = length(targetPoint.xy - uTouch);
    float touchInfluence = 1.0 - smoothstep(0.15, 1.15, touchDistance);
    vec3 awayFromTouch = normalize(vec3(
      targetPoint.xy - uTouch,
      0.55 + hash(aSeed * 193.3) * 0.35
    ));
    point += awayFromTouch * uScatter * touchInfluence * (0.45 + aSeed * 0.25);

    vec3 gatheredPoint = vec3(
      mix(targetPoint.xy, uTouch, 0.62),
      targetPoint.z + 0.48
    );
    point = mix(point, gatheredPoint, uGather * touchInfluence * 0.78);

    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uPointSize * uPixelRatio * (5.0 / -viewPosition.z);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vIntroAlpha;

  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.32, 0.5, distanceFromCenter);

    if (distanceFromCenter > 0.5) discard;
    gl_FragColor = vec4(uColor, alpha * 0.78 * vIntroAlpha);
  }
`;

const AmorphousPointCloud = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const gatherTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isGathering, setIsGathering] = useState(false);

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
      uIntroProgress: { value: 0 },
      uScatter: { value: 0 },
      uGather: { value: 0 },
      uTouch: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color('#5278ff') },
    }),
    []
  );
  
  const introSpring = useSpring({
    from: { progress: 0 },
    to: { progress: 1 },
    delay: 150,
    config: { mass: 3, tension: 80, friction: 20 }
  });

  const scatterSpring = useSpring({
    scatter: isPressed && !isGathering ? 1 : 0,
    config: { mass: 0.35, tension: 500, friction: 18 }
  });

  const gatherSpring = useSpring({
    gather: isPressed && isGathering ? 1 : 0,
    config: { mass: 0.5, tension: 280, friction: 22 }
  });

  useEffect(() => {
    return () => {
      if (gatherTimeoutRef.current) clearTimeout(gatherTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsPressed(true);
    setIsGathering(false);
    materialRef.current?.uniforms.uTouch.value.set(
      event.point.x / 1.5,
      event.point.y / 1.5
    );

    if (gatherTimeoutRef.current) clearTimeout(gatherTimeoutRef.current);
    gatherTimeoutRef.current = setTimeout(() => setIsGathering(true), 190);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isPressed) return;
    materialRef.current?.uniforms.uTouch.value.set(
      event.point.x / 1.5,
      event.point.y / 1.5
    );
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsPressed(false);
    setIsGathering(false);
    if (gatherTimeoutRef.current) clearTimeout(gatherTimeoutRef.current);
  };

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.x = elapsedTime * 0.05;
      pointsRef.current.rotation.y = elapsedTime * 0.1;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime;
      materialRef.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
      materialRef.current.uniforms.uIntroProgress.value = introSpring.progress.get();
      materialRef.current.uniforms.uScatter.value = scatterSpring.scatter.get();
      materialRef.current.uniforms.uGather.value = gatherSpring.gather.get();
    }
  });
  
  return (
    <group
      scale={1.5}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
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
      <mesh position={[0, 0, -0.65]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
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