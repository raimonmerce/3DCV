import * as THREE from 'three';
import { useEffect, useCallback, useMemo } from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls  } from "@react-three/drei";
import { ModeType, RoomType } from '@/types/types';

interface RigProps {
    position?: THREE.Vector3;
    focus?: THREE.Vector3;
    mode: ModeType;
    room: RoomType | null;
    setInTransition: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Rig({ 
    position = new THREE.Vector3(0, 0, 2), 
    focus = new THREE.Vector3(0, 0, 0),
    mode,
    room,
    setInTransition
}: RigProps) {
    const { controls, scene, size } = useThree();      
    const isMobile = size.width < 768;      
    const center: [number, number] = [1, 0];
    const radius = 5; 

    const enforceBoundary = useCallback(() => {
        const [cx, cy] = center;
        const { x, y, z } = (controls as any).getPosition();
      
        const dx = x - cx;
        const dy = y - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);
      
        if (distance > radius) {
            const angle = Math.atan2(dy, dx);
            const clampedX = cx + radius * Math.cos(angle);
            const clampedY = cy + radius * Math.sin(angle);
            const distTarget = isMobile? 8 : 4;
            (controls as any).setLookAt(
                clampedX, clampedY, z,
                clampedX, clampedY, z - distTarget, true
            );
        }
    }, [controls, isMobile, center]);

    useFrame(() => {
        if (mode === 'OpenBox' && !room) {
            enforceBoundary();
        }
    });

    const cameraConfig = useMemo(() => {
        if (room) {
            return {
                mouseButtons: {
                    left: 0,
                    middle: 0,
                    right: 0,
                    wheel: 0,
                },
                touches: { one: 128, two: 2048, three: 0 },
                minPolarAngle: 0,
                maxPolarAngle: Math.PI,
                minAzimuthAngle: -Infinity,
                maxAzimuthAngle: Infinity,
                minDistance: 3,
                maxDistance: 6,
            };
        }
    
        switch (mode) {
            case "OpenBox":
                return {
                    mouseButtons: {
                        left: 2,
                        middle: 16,
                        right: 0,
                        wheel: 16,
                    },
                    touches: { one: 128, two: 2048, three: 0 },
                    minPolarAngle: Math.PI / 2,
                    maxPolarAngle: Math.PI / 2,
                    minAzimuthAngle: 0,
                    maxAzimuthAngle: 0,
                    minDistance: isMobile? 3 : 1,
                    maxDistance: isMobile? 10 : 5,
                };
            case "Teseract":
                return {
                    mouseButtons: {
                        left: 1,
                        middle: 16,
                        right: 0,
                        wheel: 16,
                    },
                    touches: { one: 64, two: 2048, three: 0 },
                    minPolarAngle: 0,
                    maxPolarAngle: Math.PI,
                    minAzimuthAngle: -Infinity,
                    maxAzimuthAngle: Infinity,
                    minDistance: 3,
                    maxDistance: 6,
                };
            case "InitialBox":
            default:
                return {
                mouseButtons: {
                    left: 1,
                    middle: 16,
                    right: 0,
                    wheel: 16,
                },
                touches: { one: 64, two: 2048, three: 0 },
                    minPolarAngle: 0,
                    maxPolarAngle: Math.PI,
                    minAzimuthAngle: -Infinity,
                    maxAzimuthAngle: Infinity,
                    minDistance: 3,
                    maxDistance: 6,
                };
        }
    }, [mode, room, isMobile]);

    const transitionInitial = useCallback(async () => {
        if (!controls) return;
        setInTransition(true);
        await (controls as any).setLookAt(3, 8, 3, 0, 8, -1, false);
        await (controls as any).setLookAt(-3, 3, 3, 0, 0, -1, true);
        setInTransition(false);
    }, [controls, setInTransition]);

    const transitionOpen = useCallback(async () => {
        if (!controls) return;
        const z = isMobile ? 8 : 4;
        await (controls as any).setLookAt(1, 0, z, 1, 0, -1, true);
    }, [controls]);

    const transitionTeseract = useCallback(async () => {
        if (!controls) return;
        await (controls as any).setLookAt(3, 3, 3, 0, 0, -1, true);
    }, [controls]);

    // Modify transitionRoom to not invoke it immediately in useMemo
    const transitionRoom = useCallback(async (room: RoomType) => {
        if (!controls || !scene) return;
        setInTransition(true);
        const active = scene.getObjectByName(room);
        if (active) {
            active.parent?.localToWorld(position.set(0, 0, 1));
            active.parent?.localToWorld(focus.set(0, 0, -1));
        }
        await (controls as any).setLookAt(...position.toArray(), ...focus.toArray(), true);
        setInTransition(false);
    }, [controls, scene, position, focus, setInTransition]);

    useEffect(() => {
        if (room) {
            setInTransition(true)
            transitionRoom(room)
        } else {
            switch (mode) {
                case "InitialBox":
                    setInTransition(true)
                    transitionInitial();
                    break;
                case "OpenBox":
                    transitionOpen()
                    break;
                case "Teseract":
                    transitionTeseract()
                    break;
                default:
                    break;
            }
        }  
    }, [mode, room, transitionInitial, transitionOpen, transitionTeseract]);

    return (
        <CameraControls 
            mouseButtons={cameraConfig.mouseButtons as any}
            touches={cameraConfig.touches  as any}
            makeDefault 
            minPolarAngle={cameraConfig.minPolarAngle}
            maxPolarAngle={cameraConfig.maxPolarAngle}
            minAzimuthAngle={cameraConfig.minAzimuthAngle}
            maxAzimuthAngle={cameraConfig.maxAzimuthAngle}
            minDistance={cameraConfig.minDistance}
            maxDistance={cameraConfig.maxDistance}
            smoothTime={1}
        />
    );
}
