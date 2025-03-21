import * as THREE from 'three';
import { useEffect, useMemo } from 'react';
import { useGLTF, Clone } from '@react-three/drei';

type GLBModelProps = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
};

export default function GLBModel({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color
}: GLBModelProps) {
  if (!url) return;
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene ? scene.clone() : null, [scene]);
  console.log(clonedScene)
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.color.set(new THREE.Color(color));
              }
            });
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.color.set(new THREE.Color(color));
          }
        }
      });
    }
  }, [clonedScene, color]); 

  return clonedScene ? (
    <Clone
      object={clonedScene}
      castShadow 
      receiveShadow 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  ) : null;
}
