import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Outlines, RoundedBox } from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import * as TWEEN from '@tweenjs/tween.js';

type RoomObjectProps = {
    urlImage: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    color: string;
};

export default function RoomObject({
    urlImage,
    position = [0, 0, 0],
    scale = [1, 1, 1],
    color

}: RoomObjectProps) {
    const [hovered, setHovered] = useState(false);
    const [outlineOpacity, setOutlineOpacity] = useState(0);
    const texture = useLoader(THREE.TextureLoader, urlImage);
    const groupRef = useRef<THREE.Group>(null);
    const size = 2;
    const radius = 0.15;

    useFrame(({ camera }) => {
        if (groupRef.current) {
            groupRef.current.up.copy(camera.up);
            groupRef.current.lookAt(camera.position);
        }
    });

    useEffect(() => {
        if (!hovered) {
            setOutlineOpacity(0);
            return;
        }

        const tween = new TWEEN.Tween({ value: 0 })
            .to({ value: 1 }, 750)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate((obj) => {
                setOutlineOpacity(obj.value);
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();

        return () => {
            tween.stop();
        };
    }, [hovered]);

    const handlePointerOver = () => setHovered(true);
    const handlePointerOut = () => setHovered(false);
    const handleClick = () => console.log("Clicked")

    return (
        <group
            ref={groupRef} 
            position={position}
            scale={scale}
        >
            <RoundedBox
                args={[size, size, size/2]}
                radius={radius}
                smoothness={4}
                bevelSegments={4}
                creaseAngle={0.4}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                <meshPhongMaterial color={color} />
                    {hovered && 
                        <Outlines 
                            thickness={10} 
                            transparent 
                            opacity={outlineOpacity} 
                            color="white" 
                        />
                    }
            </RoundedBox>

            <mesh position={[0, 0, 0.51]}>
                <planeGeometry args={[size - (radius * 2), size - (radius * 2)]} />
                <meshBasicMaterial map={texture} transparent />
            </mesh>
        </group>

    );
}
