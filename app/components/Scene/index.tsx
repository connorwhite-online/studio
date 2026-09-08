'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';
import styles from './Scene.module.css';

const POINT_COUNT = 20000;

const getParticleSeed = (index: number) => {
  let value = index + 1;
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967295;
};

const vertexShader = `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFreq;
  uniform float uPixelRatio;
  uniform float uPointSize;
  uniform float uIntroProgress;
  uniform float uAttraction;
  uniform vec3 uTouch;

  attribute float aSeed;
  varying float vIntroAlpha;
  varying float vDeformation;

  float hash(float value) {
    return fract(sin(value) * 43758.5453123);
  }

  vec3 rotateAroundZ(vec3 point, float angle) {
    float sine = sin(angle);
    float cosine = cos(angle);
    return vec3(
      point.x * cosine - point.y * sine,
      point.x * sine + point.y * cosine,
      point.z
    );
  }

  vec3 rotateAroundY(vec3 point, float angle) {
    float sine = sin(angle);
    float cosine = cos(angle);
    return vec3(
      point.x * cosine + point.z * sine,
      point.y,
      -point.x * sine + point.z * cosine
    );
  }

  // Cheap layered-sine pseudo-noise from Materialize's CAD loading cloud.
  float noise(vec3 point) {
    return sin(point.x * 2.0 + uTime)
      * sin(point.y * 2.0 + uTime * 1.2)
      * sin(point.z * 2.0 + uTime * 0.8);
  }

  void main() {
    float deformation = noise(position * uFreq + uTime * 0.15);
    vDeformation = deformation;
    vec3 direction = normalize(position + 0.00001);
    vec3 targetPoint = position + direction * deformation * uAmp;

    vec3 scatterDirection = normalize(vec3(
      hash(aSeed * 127.1) - 0.5,
      hash(aSeed * 311.7 + 2.0) - 0.5,
      hash(aSeed * 74.7 + 7.0) - 0.5
    ));
    vec3 startPoint =
      normalize(position + scatterDirection * 0.85) *
      (1.05 + aSeed * 0.55);

    float progress = clamp((uIntroProgress - aSeed * 0.28) / 0.72, 0.0, 1.0);
    float easedProgress = progress * progress * (3.0 - 2.0 * progress);
    float vortexAngle = progress * (9.0 + aSeed * 5.0);
    vec3 vortexPoint = rotateAroundZ(startPoint, vortexAngle);
    vortexPoint = rotateAroundY(vortexPoint, vortexAngle * 0.28);
    vec3 magneticArc =
      cross(normalize(vortexPoint), normalize(targetPoint)) *
      sin(progress * 3.14159265) *
      0.16;
    vec3 point = mix(vortexPoint, targetPoint, easedProgress) + magneticArc;
    vIntroAlpha = smoothstep(0.0, 0.12, progress);

    vec3 surfaceDirection = normalize(uTouch + 0.00001);
    float axisPosition = dot(targetPoint, surfaceDirection);
    float directionalPosition = clamp((axisPosition + 1.15) / 2.3, 0.0, 1.0);
    float stretchProfile = directionalPosition
      * directionalPosition
      * (3.0 - 2.0 * directionalPosition);
    point += surfaceDirection
      * stretchProfile
      * uAttraction
      * 0.38
      * easedProgress;

    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uPointSize * uPixelRatio * (1.0 / max(0.1, -viewPosition.z));
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vIntroAlpha;
  varying float vDeformation;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float radiusSquared = dot(center, center);
    if (radiusSquared > 0.25) discard;
    float alpha = smoothstep(0.25, 0.02, radiusSquared)
      * clamp(0.6 + 0.35 * vDeformation, 0.3, 0.95);
    gl_FragColor = vec4(uColor, alpha * vIntroAlpha);
  }
`;

const AmorphousPointCloud = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const shaderTimeRef = useRef(0);
  const speedRef = useRef(0.6);
  const amplitudeRef = useRef(0.18);
  const attractionRef = useRef(0);
  const [isPressed, setIsPressed] = useState(false);

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
      seeds[index] = getParticleSeed(index);
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return bufferGeometry;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.18 },
      uFreq: { value: 2.1 },
      uPixelRatio: { value: 1 },
      uPointSize: { value: 9 },
      uIntroProgress: { value: 0 },
      uAttraction: { value: 0 },
      uTouch: { value: new THREE.Vector3(0, 0, 0.8) },
      uColor: { value: new THREE.Color('#8aa0e8') },
    }),
    []
  );
  
  const introSpring = useSpring({
    from: { progress: 0.065 },
    to: { progress: 1 },
    config: {
      duration: 4600
    }
  });

  const settlingSpring = useSpring({
    from: { settlingTilt: 0 },
    to: { settlingTilt: 0.1 },
    delay: 4250,
    config: { mass: 0.8, tension: 140, friction: 9 }
  });

  useEffect(() => {
    if (!isPressed) return;

    const releaseInteraction = () => {
      setIsPressed(false);
    };

    window.addEventListener('pointerup', releaseInteraction);
    window.addEventListener('pointercancel', releaseInteraction);

    return () => {
      window.removeEventListener('pointerup', releaseInteraction);
      window.removeEventListener('pointercancel', releaseInteraction);
    };
  }, [isPressed]);

  const updateTouchPoint = (event: ThreeEvent<PointerEvent>) => {
    const points = pointsRef.current;
    if (!points || !materialRef.current) return;

    points.updateWorldMatrix(true, false);
    const localRay = event.ray.clone().applyMatrix4(
      points.matrixWorld.clone().invert()
    );
    const localTouch = localRay.intersectSphere(
      new THREE.Sphere(new THREE.Vector3(), 1.15),
      new THREE.Vector3()
    );

    if (localTouch) {
      materialRef.current.uniforms.uTouch.value.copy(localTouch);
    }
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    updateTouchPoint(event);
    setIsPressed(true);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (isPressed) updateTouchPoint(event);
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsPressed(false);
  };

  useFrame((state, delta) => {
    const introProgress = introSpring.progress.get();
    const rotationProgress =
      introProgress * introProgress * (3 - 2 * introProgress);
    const rotationBoost = 1 - rotationProgress;
    const active = introProgress < 0.999 || isPressed;
    const smoothing = Math.min(1, delta * 2.5);

    speedRef.current += ((active ? 1.7 : 0.6) - speedRef.current) * smoothing;
    amplitudeRef.current +=
      ((active ? 0.32 : 0.18) - amplitudeRef.current) * smoothing;
    attractionRef.current +=
      ((isPressed ? 1 : 0) - attractionRef.current)
      * Math.min(1, delta * (isPressed ? 3.5 : 2.2));
    shaderTimeRef.current += delta * speedRef.current;

    if (pointsRef.current) {
      rotationRef.current.x += delta * (0.07 + rotationBoost * 0.42);
      rotationRef.current.y += delta * (0.15 + rotationBoost * 2.15);
      pointsRef.current.rotation.x = rotationRef.current.x;
      pointsRef.current.rotation.y = rotationRef.current.y;
      pointsRef.current.rotation.z = settlingSpring.settlingTilt.get();
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = shaderTimeRef.current;
      materialRef.current.uniforms.uAmp.value = amplitudeRef.current;
      materialRef.current.uniforms.uAttraction.value = attractionRef.current;
      materialRef.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
      materialRef.current.uniforms.uIntroProgress.value = introProgress;
    }
  });
  
  return (
    <group
      scale={1.5}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
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
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <AmorphousPointCloud />
      </Canvas>
    </div>
  );
};

export default Scene; 