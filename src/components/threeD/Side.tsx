import { useRef, useState, ReactNode, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, Text } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { ModeType, RoomType } from '@/types/types';

type SideProps = {
  name: string;
  bg?: string;
  mode: ModeType;
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
  children?: ReactNode;
};

export default function Side({ 
  name, 
  bg = '#f0f0f0', 
  mode,
  room,
  setRoom,
  children 
}: SideProps) {
  const [isHovered, setIsHovered] = useState(false);
  const portal = useRef<any>(null);
  const roomMesh = useRef<Mesh>(null);
  const emissiveMesh = useRef<Mesh>(null);
  const hoverStartTime = useRef<number | null>(null);

  useCursor(isHovered);

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

  const handleDoubleClick = useCallback(() => {
    setRoom(name as RoomType);
  }, [setRoom, name]);

  useEffect(() => {
    if (!roomMesh.current || !portal.current) return
    const from = { ...roomMesh.current.scale, blend: portal.current.blend }
    
    const to = room === name 
      ? { x: 6, y: 6, z: 6, blend: 1 } 
      : { x: 1, y: 1, z: 1, blend: 0 };

    const delay = room === name? 2000 : 0

    if (
      from.x === to.x && 
      from.y === to.y && 
      from.z === to.z && 
      from.blend === to.blend
    ) {
      return;
    }

    const tween = new TWEEN.Tween(from)
      .to(to, 500)
      .delay(delay)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((obj) => {
        roomMesh.current?.scale.set(obj.x, obj.y, obj.z);
          portal.current.blend = obj.blend;
      })
      .start();

    return () => {
      tween.stop();
    };
  }, [name, room]);

  return (
    <group>
      
        <>
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
              <mesh ref={roomMesh} position={[0, 0, -1]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshToonMaterial color={bg} side={1}/>
              </mesh> 
              {children}
            </MeshPortalMaterial>
          </mesh>
          {isHovered && (mode === 'OpenBox' || mode === 'Teseract') && (
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
        </>

      <mesh rotation={[0,0,0]}>
        <planeGeometry args={[2,2]} />
        <meshPhongMaterial color={'#98FB98'} side={1}/>
      </mesh>
    </group>
  );
}
