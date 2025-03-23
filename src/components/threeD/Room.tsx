import { ReactNode, useEffect, useRef } from 'react';
import { MeshPhongMaterial } from 'three';
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
    const roomMaterial = useRef<MeshPhongMaterial>(null);
    
    useEffect(() => {
        if (!roomMaterial.current) return
       
        const from = { opacity: roomMaterial.current.opacity}
        
        const to = selected
            ? { opacity: 0} 
            : { opacity: 1};
    
        const delay = selected? 2000 : 0
    
        if (from.opacity === to.opacity) return;
    
        const tween = new TWEEN.Tween(from)
            .to(to, 500)
            .delay(delay)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((obj) => {
                if (!roomMaterial.current) return
                roomMaterial.current.opacity = obj.opacity;
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
            <mesh position={[0, 0, -1]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshPhongMaterial ref={roomMaterial} color={color} side={1} transparent opacity={1}/>
            </mesh> 
            {selected &&
                <mesh position={[0, 0, -1]}>
                    <sphereGeometry args={[10, 32, 16]} />
                    <meshPhongMaterial color={color} side={2}/>
                </mesh> 
            }
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
