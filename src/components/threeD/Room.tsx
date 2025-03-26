import { ReactNode, useEffect, useRef, useState } from 'react';
import { MeshPhongMaterial, MeshStandardMaterial } from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import GLBModel from './GLBModel';
import { Center, Text3D } from '@react-three/drei';

type RoomProps = {
    url: string;
    color: string;
    children?: ReactNode;
    selected: boolean;
    title: string;
};

export default function Room({ 
    url,
    color,
    children,
    selected,
    title
}: RoomProps) {
    const roomMaterial = useRef<MeshPhongMaterial>(null);
    const textMaterial = useRef<MeshStandardMaterial>(null);
    const [insideRoom, setInsideRoom] = useState(false);
    useEffect(() => {
        if(!selected) setInsideRoom(false)
        if (!roomMaterial.current || !textMaterial.current) return
       
        const from = { opacity: roomMaterial.current.opacity}
        
        const to = selected
            ? { opacity: 0} 
            : { opacity: 1};
    
        const delay = selected? 1750 : 0
    
        if (from.opacity === to.opacity) return;
        
    
        const tween = new TWEEN.Tween(from)
            .to(to, 750)
            .delay(delay)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((obj) => {
                if (!roomMaterial.current || !textMaterial.current) return
                roomMaterial.current.opacity = obj.opacity;
                textMaterial.current.opacity = obj.opacity;
            })
            .onComplete(() => {
                setInsideRoom(selected)
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

            <GLBModel 
                url={url} 
                position={[0, -0.6, -1]} 
                scale={[0.6, 0.6, 0.6]}
                color={color}
            />
            {!insideRoom && 
                <>
                    <mesh position={[0, 0, -1]}>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshPhongMaterial ref={roomMaterial} color={color} side={1} transparent opacity={1}/>
                    </mesh> 
                    <Center>
                        <Text3D 
                            letterSpacing={0}
                            size={0.2}
                            font="/3DCV/Inter_Bold.json"
                            position={[0.1, 0, -0.1]}
                            scale={[1, 1, 0.2]}
                        >
                            {title}
                            <meshStandardMaterial ref={textMaterial} emissiveIntensity={0.75} emissive={"white"} transparent opacity={1}/>
                        </Text3D>
                    </Center>
                </>
            }

            {selected && 
                <>
                    <mesh position={[0, 0, -1]}>
                        <sphereGeometry args={[10, 32, 16]} />
                        <meshPhongMaterial color={color} side={2}/>
                    </mesh> 
                    {children}
                </>
            }
        </> 
    );
}
