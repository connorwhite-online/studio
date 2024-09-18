import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const SandblastMaterial = shaderMaterial(
  {
    color: new THREE.Color(0.8, 0.8, 0.8), // Aluminum base color
    roughness: 0.3, // Adjusted roughness
    metalness: 1.0, // High metalness for aluminum
    envMap: null,
    envMapIntensity: 1.0, // Adjusted envMapIntensity
  },
  // Vertex Shader
  `
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
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

    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    float random(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
    }

    vec3 generateNormal(vec3 position) {
      float strength = 0.1; // Increased strength for more noticeable details
      float n = random(position * 100.0); // Increased scale for finer noise
      vec3 normal = vec3(n, n, 1.0) * strength;
      return normalize(normal);
    }

    void main() {
      vec3 normal = normalize(vNormal + generateNormal(vWorldPosition));
      vec3 viewDir = normalize(-vWorldPosition);

      vec3 baseColor = color * vec3(0.9, 0.9, 0.9); // Adjusted base color for aluminum

      float diffuse = max(dot(normal, viewDir), 0.0);
      vec3 diffuseLight = baseColor * (0.6 + 0.4 * diffuse); // Adjusted diffuse light contribution

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
