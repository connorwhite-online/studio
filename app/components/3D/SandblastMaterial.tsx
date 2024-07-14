import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const SandblastMaterial = shaderMaterial(
  {
    color: new THREE.Color(0.8, 0.8, 0.8),
    roughness: 0.7,
    metalness: 0.8,
    envMap: null,
    envMapIntensity: 0.5,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 color;
    uniform float roughness;
    uniform float metalness;
    uniform samplerCube envMap;
    uniform float envMapIntensity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(-vPosition);
      
      vec2 noiseCoord = vUv * 1000.0;
      float n = noise(noiseCoord);
      
      vec3 baseColor = color * (0.9 + 0.1 * n);
      
      float diffuse = max(dot(normal, viewDir), 0.0);
      vec3 diffuseLight = baseColor * (0.4 + 0.6 * diffuse);

      vec3 reflectVec = reflect(-viewDir, normal);
      vec3 envColor = textureCube(envMap, reflectVec).rgb;
      vec3 specular = envColor * envMapIntensity * (1.0 - roughness) * metalness;
      
      vec3 finalColor = diffuseLight + specular;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

extend({ SandblastMaterial })

export { SandblastMaterial }