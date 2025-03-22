import * as THREE from 'three';
import { useEffect } from 'react';
import { useThree } from "@react-three/fiber";
import { CameraControls  } from "@react-three/drei";
import { ModeType, RoomType } from '@/types/types';

interface RigProps {
    position?: THREE.Vector3;
    focus?: THREE.Vector3;
    mode: ModeType;
    room: RoomType | null;
}

export default function Rig({ 
    position = new THREE.Vector3(0, 0, 2), 
    focus = new THREE.Vector3(0, 0, 0),
    mode,
    room
}: RigProps) {
    const { controls, scene } = useThree();

    async function initialTransition() {
        await (controls as any)?.setLookAt( 4, 8, 4, 0, 8, -1, false )
        await (controls as any)?.setLookAt( -4, 3, 4, 0, 0, -1, true )
    }

    useEffect(() => {
        if (room) {
            const active = scene.getObjectByName(room);
            if (active) {
                active.parent?.localToWorld(position.set(0, 0, 1));
                active.parent?.localToWorld(focus.set(0, 0, -1));
            }
            (controls as any)?.setLookAt(...position.toArray(), ...focus.toArray(), true);
        } else if (mode === 'InitialBox') initialTransition()
        else if (mode === 'OpenBox') (controls as any)?.setLookAt(1, 0, 4, 1, 0, -1, true);
        else if (mode === 'Teseract') (controls as any)?.setLookAt(4, 4, 4, 0, 0, -1, true);  
    }, [mode, room, scene, position, focus, controls]);

    return (
        <CameraControls 
            mouseButtons={{
                left: mode === "OpenBox" && !room
                    ? 2
                    : 1,
                middle: 16,
                right: 0,
                wheel: 16,
            }}
            touches={{
                one: mode === "OpenBox" && !room
                    ? 128
                    : 64,
                two: 2048,
                three: 0,
            }}
            makeDefault 
            minPolarAngle={mode === "OpenBox" && !room ? Math.PI / 2 : 0}
            maxPolarAngle={mode === "OpenBox" && !room? Math.PI / 2 : Math.PI}
            minAzimuthAngle={mode === "OpenBox" && !room? 0 : -Infinity}
            maxAzimuthAngle={mode === "OpenBox" && !room? 0 : Infinity}
            minDistance={mode === "OpenBox" && !room? 1 : 3}
            maxDistance={mode === "OpenBox" && !room? 5 : 6}
            smoothTime={1}
        />
    );
}
