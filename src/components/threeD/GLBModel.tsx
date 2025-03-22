import * as THREE from 'three';
import { useEffect, useMemo } from 'react';
import { useGLTF, Clone } from '@react-three/drei';
import { assets } from '../../assets/assets'

type GLBModelProps = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export default function GLBModel({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: GLBModelProps) {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene ? scene.clone() : null, [scene]);

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
