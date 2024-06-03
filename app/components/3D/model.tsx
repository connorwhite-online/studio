import * as THREE from 'three'
import React, { use, useRef } from 'react'
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
    ['Steel - Satin']: THREE.MeshPhysicalMaterial
    Knob: THREE.MeshStandardMaterial
    Lens: THREE.MeshPhysicalMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/device.gltf') as GLTFResult
  const group = useRef<THREE.Group>(null!)
  const tl = useRef<gsap.core.Timeline>()

  // useFrame(({ clock }) => {
  //   const t = clock.getElapsedTime()
  //   group.current.rotation.y += Math.PI / 500
  
  // })

  useGSAP(() => {
    tl.current = gsap.timeline({ yoyo: true, repeat: -1 })
    .fromTo(group.current.rotation, {
      x: 2.542,
      y: -0.833,
      z: 1.502
    }, {
      // z: .1,
      y: Math.PI * 3, 
      duration: 6, 
      ease: 'power4.inOut',
      delay: 1,
    })
    
  }, { dependencies: [] })


  return (
      <group 
      ref={group} 
      rotation={[2.542, -0.833, 1.102]} 
      // rotation={[0, 0, 0]} 
      scale={0.075} 
      {...props} dispose={null}>
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