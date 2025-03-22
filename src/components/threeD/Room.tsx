import { ReactNode, useEffect, useRef } from 'react';
import { Mesh } from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import GLBModel from './GLBModel';

type RoomProps = {
    url: string;
    color: string;
    children?: ReactNode;
    selected: boolean;
};

export default function Room({ 
    url,
    color,
    children,
    selected
}: RoomProps) {
    const roomMesh = useRef<Mesh>(null);
    
    useEffect(() => {
        if (!roomMesh.current) return
        const from = { ...roomMesh.current.scale}
        
        const to = selected
            ? { x: 6, y: 6, z: 6} 
            : { x: 1, y: 1, z: 1};
    
        const delay = selected? 2000 : 0
    
        if (
            from.x === to.x && 
            from.y === to.y && 
            from.z === to.z
        ) {
            return;
        }
    
        const tween = new TWEEN.Tween(from)
            .to(to, 500)
            .delay(delay)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((obj) => {
                roomMesh.current?.scale.set(obj.x, obj.y, obj.z);
            })
            .start();
    
        return () => {
            tween.stop();
        };
    }, [selected]);

    return (
        <>
            <directionalLight intensity={2} position={[1,1,1]}/>
            <directionalLight intensity={2} position={[-1,-1,-1]}/>
            <pointLight intensity={2.0} position={[0,0,0]}/>
            <mesh ref={roomMesh} position={[0, 0, -1]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshPhongMaterial color={color} side={1}/>
            </mesh> 
            <GLBModel 
                url={url} 
                position={[0, -0.6, -1]} 
                scale={[0.6, 0.6, 0.6]}
                color={color}
            />
            {children}
        </> 
    );
}
