import { useGLTF, Clone } from '@react-three/drei';
import { useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { navigateTo } from '../../utils/utils';
import BillboardHTML from './BillboardHtml';

type RoomObjectProps = {
    url: string;
    name?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
    urlLink: string;
    nameLink: string;
    offsetPoint?: [number, number, number];
};

export default function RoomObject({
    url,
    name,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    urlLink,
    nameLink,
    offsetPoint = [0, 0, -1]
}: RoomObjectProps) {
    const { scene } = useGLTF(url, '/draco-gltf');
    const [center, setCenter] = useState<null | THREE.Vector3>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTextHovered, setIsTextHovered] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const popupFadeSpeed = 4.0;
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
        if (clonedScene && !center) {
            const bbox = new THREE.Box3().setFromObject(clonedScene);
            const tempCenter = new THREE.Vector3();
            bbox.getCenter(tempCenter);
            setCenter(tempCenter);
        }
    }, [clonedScene, center]);

    useFrame((_state, delta) => {
        if (isHovered || isTextHovered) {
            setOpacity((prev) => Math.min(prev + delta * popupFadeSpeed, 1));
        } else {
            setOpacity((prev) => Math.max(prev - delta * popupFadeSpeed, 0));
        }
    });

    const handlePointerOver = () => setIsHovered(true);
    const handlePointerOut = () => setIsHovered(false);
    const handleTextOver = () => setIsTextHovered(true);
    const handleTextOut = () => setIsTextHovered(false);
    const handleClick = () => navigateTo(urlLink);

    return (
        <group
            name={name}
            position={position}
            rotation={rotation}
            scale={scale}
        >
            <Clone
                object={clonedScene}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
                castShadow 
                receiveShadow 
            />

            {center && (
                <BillboardHTML
                    center={center}
                    offsetPoint={offsetPoint}
                    opacity={opacity}
                    isHovered={isHovered}
                    nameLink={nameLink}
                    handleClick={handleClick}
                    handleTextOver={handleTextOver}
                    handleTextOut={handleTextOut}
                />
            )}
        </group>
    );
}
