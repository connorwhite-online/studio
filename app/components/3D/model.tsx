import * as THREE from 'three'
import React, { use, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type GLTFResult = GLTF & {
  nodes: {
    Bolt_1002: THREE.Mesh
    Bolt_2002: THREE.Mesh
    Bottom002: THREE.Mesh
    Button002: THREE.Mesh
    Knob002: THREE.Mesh
    Lidar_Lens002: THREE.Mesh
    Top002: THREE.Mesh
  }
  materials: {
    ['Stainless Steel']: THREE.MeshStandardMaterial
    BakedAluminum: THREE.MeshStandardMaterial
    ['ABS Plastic']: THREE.MeshStandardMaterial
    ['Ceramic Glass Lens']: THREE.MeshPhysicalMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/device-06-21.gltf') as GLTFResult;

  const group = useRef<THREE.Group>(null!)
  const tl = useRef<gsap.core.Timeline>()

  useGSAP(() => {
    if (!group.current) return
    tl.current = gsap.timeline({ yoyo: true, repeat: -1 })
    .fromTo(group.current.rotation, {
      x: 0,
      y: Math.PI * 1.15,
      z: 0
    }, {
      // z: .1,
      y: Math.PI * 4.15, 
      duration: 5, 
      ease: 'power4.inOut',
      delay: 1,
    })
    
  }, { dependencies: [] });

  return (
    <group {...props} dispose={null} ref={group}
    scale={1}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bolt_1002.geometry}
        material={materials['Stainless Steel']}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bolt_2002.geometry}
        material={materials['Stainless Steel']}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bottom002.geometry}
        material={materials.BakedAluminum}
        position={[0, 0, -0.2]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button002.geometry}
        material={materials.BakedAluminum}
        position={[0, 0, -0.2]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Knob002.geometry}
        material={materials['ABS Plastic']}
        position={[0, 0, -0.2]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lidar_Lens002.geometry}
        material={materials['Ceramic Glass Lens']}
        position={[0, 0, -0.2]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top002.geometry}
        material={materials.BakedAluminum}
        position={[0, 0, -0.2]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.5}
      />
    </group>
  )
}

useGLTF.preload('/device-06-21.gltf');