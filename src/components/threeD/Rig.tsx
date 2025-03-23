import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { useThree, useFrame } from "@react-three/fiber";
import { CameraControls  } from "@react-three/drei";
import { ModeType, RoomType } from '@/types/types';
import { easing } from 'maath'

interface RigProps {
    position?: THREE.Vector3;
    focus?: THREE.Vector3;
    mode: ModeType;
    room: RoomType | null;
    inTransition: boolean;
}

type PosTarget = {
    x: number;
    y: number;
    z: number;
    tx: number;
    ty: number;
    tz: number;
};

export default function Rig({ 
    position = new THREE.Vector3(0, 0, 2), 
    focus = new THREE.Vector3(0, 0, 0),
    mode,
    room,
    inTransition
}: RigProps) {
    const { controls, scene } = useThree();
    const [transition, setTransition] = useState(false);
    const [initialCameraPoint, setInitialCameraPoint] = useState({x:0, y:0, z:0});
    const lerpSpeed: number = 0.0005;

    function lerp(
        current: number, 
        target: number, 
        alpha: number, 
        min: number, 
        max: number
    ): number {
        const result = current + (target - current) * alpha;
        return Math.max(min, Math.min(max, result));
    }

    function getRoomPosTarget(
        room: RoomType, 
        mode: ModeType, 
        cameraPos: any, 
        fixedTargetX: number, 
        fixedTargetY: number
    ) {
        let x, y, z;
        if (mode === "OpenBox") {
            x = lerp(cameraPos.x, fixedTargetX, lerpSpeed, initialCameraPoint.x - 1, initialCameraPoint.x + 1)
            y = lerp(cameraPos.y, fixedTargetY, lerpSpeed, initialCameraPoint.y - 1, initialCameraPoint.y + 1)
            return {
                x: x,
                y: y,
                z: cameraPos.z,
                tx: x,
                ty: y,
                tz: cameraPos.z - 0.1
            };
        }
    
        switch (room) {
            case "AboutMe":
                x = lerp(cameraPos.x, fixedTargetX, lerpSpeed, initialCameraPoint.x - 1, initialCameraPoint.x + 1)
                y = lerp(cameraPos.y, fixedTargetY, lerpSpeed, initialCameraPoint.y - 1, initialCameraPoint.y + 1)
                return {
                    x: x,
                    y: y,
                    z: cameraPos.z,
                    tx: x,
                    ty: y,
                    tz: cameraPos.z - 0.1
                };
            case "Contact":
                x = lerp(cameraPos.x, fixedTargetY, lerpSpeed, initialCameraPoint.x - 1,initialCameraPoint.x + 1)
                z = lerp(cameraPos.z, -fixedTargetX, lerpSpeed, initialCameraPoint.z - 1, initialCameraPoint.z + 1)
                return {
                    x: x,
                    y: cameraPos.y,
                    z: z,
                    tx: x,
                    ty: cameraPos.y + 0.1,
                    tz: z
                };
            case "CV":
                x = lerp(cameraPos.x, fixedTargetX, lerpSpeed, initialCameraPoint.x - 1,initialCameraPoint.x + 1)
                z = lerp(cameraPos.z, -fixedTargetY, lerpSpeed, initialCameraPoint.z - 1, initialCameraPoint.z + 1)
                return {
                    x: x,
                    y: cameraPos.y,
                    z: z,
                    tx: x,
                    ty: cameraPos.y - 0.1,
                    tz: z
                };
            case "Experience":
                y = lerp(cameraPos.y, fixedTargetY, lerpSpeed, initialCameraPoint.y - 1, initialCameraPoint.y + 1)
                z = lerp(cameraPos.z, -fixedTargetX, lerpSpeed, initialCameraPoint.z - 1, initialCameraPoint.z + 1)
                return {
                    x: cameraPos.x,
                    y: y,
                    z: z,
                    tx: cameraPos.x - 0.1,
                    ty: y,
                    tz: z
                };
            case "Projects":
                x = lerp(cameraPos.x, -fixedTargetX, lerpSpeed, initialCameraPoint.x - 1,initialCameraPoint.x + 1)
                y = lerp(cameraPos.y, fixedTargetY, lerpSpeed, initialCameraPoint.y - 1, initialCameraPoint.y + 1)
                return {
                    x: x,
                    y: y,
                    z: cameraPos.z,
                    tx: x,
                    ty: y,
                    tz: cameraPos.z + 0.1
                };
            default:
                y = lerp(cameraPos.y, fixedTargetY, lerpSpeed, initialCameraPoint.y - 1,initialCameraPoint.y + 1)
                z = lerp(cameraPos.z, fixedTargetX, lerpSpeed, initialCameraPoint.z - 1, initialCameraPoint.z + 1)
                return {
                    x: cameraPos.x,
                    y: y,
                    z: z,
                    tx: cameraPos.x + 0.1,
                    ty: y,
                    tz: z
                };
        }
    }

    useFrame((state, delta) => {
        if (!room || transition) return;

        const targetX: number = (state.pointer.x * state.viewport.width) * 5; 
        const targetY: number = (state.pointer.y * state.viewport.height) * 5;

        const fixedTargetX: number = parseFloat(targetX.toFixed(2)); 
        const fixedTargetY: number = parseFloat(targetY.toFixed(2));

        const posTarget: PosTarget = getRoomPosTarget(room, mode, state.camera.position, fixedTargetX, fixedTargetY);

        if (controls && (controls as any).setPosition) {
            (controls as any).setTarget(posTarget.tx * 1.03, posTarget.ty * 1.03, posTarget.tz * 1.03, false);
            (controls as any).setPosition(posTarget.x, posTarget.y, posTarget.z, false);
        } else {
            console.error("Controls not available or setPosition method is missing.");
        }

        // const axis = getRoomAxis(room, mode, state.camera.position, fixedTargetX, fixedTargetY)

        // state.camera.position.x = axis.x
        // state.camera.position.y = axis.y
        // state.camera.position.z = axis.z
    });

    function getCameraConfig(mode: ModeType, room: RoomType | null) {
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
                    minDistance: 1,
                    maxDistance: 5,
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
    }

    async function initialTransition() {
        await (controls as any)?.setLookAt( 3, 8, 3, 0, 8, -1, false )
        await (controls as any)?.setLookAt( -3, 3, 3, 0, 0, -1, true )
    }

    async function openTransition() {
        await (controls as any)?.setLookAt(1, 0, 4, 1, 0, -1, true);
        setInitialCameraPoint({x: 1, y: 0, z: 0})
    }

    async function teseractTransition() {
        await (controls as any)?.setLookAt(3, 3, 3, 0, 0, -1, true);
    }

    async function roomTransition(room: RoomType) {
        setTransition(true)
        const active = scene.getObjectByName(room);
        if (active) {
            active.parent?.localToWorld(position.set(0, 0, 1));
            active.parent?.localToWorld(focus.set(0, 0, -1));
        }
        await (controls as any)?.setLookAt(...position.toArray(), ...focus.toArray(), true);
        setInitialCameraPoint({x: position.x, y: position.y, z: position.z})
        setTransition(false)
    }

    useEffect(() => {
        if (room) {
            roomTransition(room)
        } else {
            switch (mode) {
                case "InitialBox":
                    initialTransition();
                    break;
                case "OpenBox":
                    openTransition()
                    break;
                case "Teseract":
                    teseractTransition()
                    break;
                default:
                    break;
            }
        }  
    }, [mode, room, controls]);

    const cameraConfig = getCameraConfig(mode, room);

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
