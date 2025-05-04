import { useRef, useState, ReactNode, useEffect, useCallback } from 'react';
import { useCursor, MeshPortalMaterial } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { ModeType, RoomType } from '@/types/types';
import { getCssVariableValue } from '../../utils/utils';
import Room from './Room';

type SideProps = {
  id: string;
  title: string;
  url: string;
  color?: string;
  mode: ModeType;
  room: RoomType | null;
  inTransition: boolean;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
  children?: ReactNode;
};

export default function Side({ 
  id,
  title,
  url,
  color = '#f0f0f0', 
  mode,
  room,
  inTransition,
  setRoom,
  children 
}: SideProps) {
  const [isHovered, setIsHovered] = useState(false);
  const portal = useRef<any>(null);
  const emissiveMesh = useRef<Mesh>(null);
  const rootStyles = getComputedStyle(document.documentElement);

  useCursor(isHovered);

  useEffect(() => {
    const material = emissiveMesh.current?.material as MeshStandardMaterial;
    if (!material || !isHovered || inTransition) return
    const tween = new TWEEN.Tween({ value: 0 })
    .to({ value: 1 }, 750)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((obj) => {
      material.opacity = obj.value
    })
    .repeat(Infinity)
    .yoyo(true)
    .start();

    return () => {
      tween.stop();
    };
  }, [isHovered]);

  const handlePointerOver = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (mode === "InitialBox" || inTransition) return
    setRoom(id as RoomType);
  }, [mode, setRoom, id, inTransition]);

  useEffect(() => {
    if (!portal.current) return
    const from = {blend: portal.current.blend }
    
    const to = room === id 
      ? { blend: 1 } 
      : { blend: 0 };

    const delay = room === id? 2000 : 0

    if (from.blend === to.blend) return;

    const tween = new TWEEN.Tween(from)
      .to(to, 500)
      .delay(delay)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((obj) => {
        portal.current.blend = obj.blend;
      })
      .start();

    return () => {
      tween.stop();
    };
  }, [id, room]);

  return (
    <group>
      
        <>
          <mesh
            name={id}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onDoubleClick={handleDoubleClick}
          >
            <planeGeometry args={[2, 2]} />
            <MeshPortalMaterial ref={portal} side={0} resolution={512} blur={0}>
              <Room url={url} color={color} selected={room === id} title={title}>
                {children}
              </Room>
            </MeshPortalMaterial>
          </mesh>
          {isHovered && (mode === 'OpenBox' || mode === 'Teseract') && (
            <mesh ref={emissiveMesh} position={[0, 0, -0.01]} rotation={[0, 0, Math.PI/4]}>
              <ringGeometry args={[1.414, 1.5, 4]} />
              <meshBasicMaterial 
                side={0} 
                color={rootStyles.getPropertyValue('--color-outline').trim()}
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
        <meshPhongMaterial color={getCssVariableValue("--color-cube")} side={1}/>
      </mesh>
    </group>
  );
}
