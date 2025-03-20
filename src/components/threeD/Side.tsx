import { useRef, useState, ReactNode, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, Text } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'

type SideProps = {
  name: string;
  bg?: string;
  children?: ReactNode;
};

export default function Side({ 
  name, 
  bg = '#f0f0f0', 
  children 
}: SideProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [roomSize, setRoomSize] = useState(2);
  const portal = useRef<any>(null);
  const room = useRef<Mesh>(null);
  const emissiveMesh = useRef<Mesh>(null);
  const hoverStartTime = useRef<number | null>(null);
  const [, params] = useRoute('/:id')
  const [, setLocation] = useLocation()

  const calculatedPlaneSize = useMemo(() => {
    return params?.id === name ? 10 : 2;
  }, [params?.id, name]);

  useCursor(isHovered);

  if (calculatedPlaneSize !== roomSize) {
    setRoomSize(calculatedPlaneSize);
  }

  useFrame((state, dt) => {
    easing.damp(
      portal.current,
      'blend',
      params?.id === name ? 1 : 0,
      0.2,
      dt
    )
  });

  // Handle hover animation effects
  useFrame(({ clock }) => {
    if (isHovered && emissiveMesh.current) {
      if (hoverStartTime.current === null) {
        hoverStartTime.current = clock.elapsedTime;
      }
      const elapsed = clock.elapsedTime - hoverStartTime.current;
      const material = emissiveMesh.current.material as MeshStandardMaterial;
      material.opacity = Math.sin(elapsed * Math.PI);
    } else {
      hoverStartTime.current = null;
    }
  });

  const handlePointerOver = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleDoubleClick = useCallback(
    (e) => {
      setRoomSize(10);
      e.stopPropagation();
      setLocation('/' + e.object.name);
    },
    [setLocation]
  );

  return (
    <group>
      <Text 
        fontSize={0.3} 
        anchorY="top" 
        anchorX="left" 
        lineHeight={0.8} 
        position={[-1, 1, 0.01]} 
        material-toneMapped={false}
      >
        {name}
      </Text>
      <mesh
        name={name}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onDoubleClick={handleDoubleClick}
      >
        <planeGeometry args={[2, 2]} />
        <MeshPortalMaterial ref={portal} side={0}>
          <ambientLight intensity={0.5} />
          <pointLight intensity={1.0}/>
          <mesh ref={room} position={[0, 0, -1]}>
            <boxGeometry args={[roomSize, roomSize, roomSize]} />
            <meshToonMaterial color={bg} side={1}/>
          </mesh> 
          {children}
        </MeshPortalMaterial>
      </mesh>
      {isHovered && (
        <mesh ref={emissiveMesh} position={[0, 0, -0.01]} rotation={[0, 0, Math.PI/4]}>
          <ringGeometry args={[1.414, 1.5, 4]} />
          <meshStandardMaterial 
            side={0} 
            emissive={"white"} 
            emissiveIntensity={1}
            depthTest={false}
            depthWrite={false}
            transparent
            opacity={0}
          />
        </mesh>
      )}
      <mesh rotation={[0,0,0]}>
        <planeGeometry args={[2,2]} />
        <meshPhongMaterial color={"orange"} side={1}/>
      </mesh>
    </group>
  );
}
