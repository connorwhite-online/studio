import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type GLTFResult = GLTF & {
  nodes: {
    Bolt_1: THREE.Mesh
    Bolt_2: THREE.Mesh
    Bottom: THREE.Mesh
    Button: THREE.Mesh
    Knob: THREE.Mesh
    Lidar_Lens: THREE.Mesh
    Top: THREE.Mesh
  }
  materials: {
    ['Stainless Steel']: THREE.MeshStandardMaterial
    ['Anodized Aluminum']: THREE.MeshPhysicalMaterial
    ['ABS Plastic']: THREE.MeshStandardMaterial
    ['Ceramic Glass Lens']: THREE.MeshPhysicalMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/device.gltf') as GLTFResult

  const group = useRef<THREE.Group>(null!)
  const tl = useRef<gsap.core.Timeline>()

  useGSAP(() => {
    tl.current = gsap.timeline({ yoyo: true, repeat: -1 })
    .fromTo(group.current.rotation, {
      // x: 2.542,
      // y: -0.5,
      // z: 1.502
      x: 0,
      y: Math.PI * 1.15,
      z: -(Math.PI / 2)
    }, {
      // z: .1,
      y: Math.PI * 4.15, 
      duration: 6, 
      ease: 'power4.inOut',
      delay: 1,
    })
    
  }, { dependencies: [] })

  return (
    <group ref={group} {...props} dispose={null} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={1.25}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bolt_1.geometry}
          material={materials['Stainless Steel']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bolt_2.geometry}
          material={materials['Stainless Steel']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bottom.geometry}
          material={materials['Anodized Aluminum']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button.geometry}
          material={materials['Anodized Aluminum']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Knob.geometry}
          material={materials['ABS Plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Lidar_Lens.geometry}
          material={materials['Ceramic Glass Lens']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Top.geometry}
          material={materials['Anodized Aluminum']}
        />
    </group>
  )
}

useGLTF.preload('/device.gltf')
