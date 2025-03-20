import { useRef, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, MeshPortalMaterial, Text } from '@react-three/drei';
import { BackSide, Mesh } from 'three';
import { useControls } from 'leva';

type SideProps = {
  name: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  bg?: string;
  children?: ReactNode;
  index: number;
};

export default function Portal({ name, position, rotation = [0, 0, 0], bg = '#f0f0f0', children, index }: SideProps) {
  const mesh = useRef<Mesh>(null);
  const { worldUnits } = useControls({ worldUnits: false });

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta;
      mesh.current.rotation.y += delta;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Text 
        fontSize={0.3} 
        anchorY="top" 
        anchorX="left" 
        lineHeight={0.8} 
        position={[-1,1,0.01]} 
        material-toneMapped={false}
      >
        {name}
      </Text>
      <mesh  >
        <planeGeometry args={[2,2]} />
        <meshStandardMaterial color="lightblue" side={0} />
      </mesh>
    </group>
  );
}
