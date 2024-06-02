import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Bolt_1: THREE.Mesh
    Bolt_2: THREE.Mesh
    Bottom: THREE.Mesh
    Button: THREE.Mesh
    Knob: THREE.Mesh
    Lidar_Lens: THREE.Mesh
    Top: THREE.Mesh
    // Backdrop: THREE.Mesh
    Plane: THREE.Mesh
    Plane001: THREE.Mesh
  }
  materials: {
    ['Steel - Satin']: THREE.MeshPhysicalMaterial
    Knob: THREE.MeshStandardMaterial
    Lens: THREE.MeshPhysicalMaterial
    // Backdrop: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/device.gltf') as GLTFResult
  return (
      <group rotation={[2.542, -0.833, 1.102]} scale={0.05} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bolt_1.geometry}
          material={materials['Steel - Satin']}
          scale={10}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bolt_2.geometry}
          material={materials['Steel - Satin']}
          scale={10}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bottom.geometry}
          material={materials['Steel - Satin']}
          scale={10}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button.geometry}
          material={materials['Steel - Satin']}
          scale={10}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Knob.geometry}
          material={materials.Knob}
          scale={10}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Lidar_Lens.geometry}
          material={materials.Lens}
          scale={10}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Top.geometry}
          material={materials['Steel - Satin']}
          scale={10}
        />
    </group>
  )
}

useGLTF.preload('/device.gltf')