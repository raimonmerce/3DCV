import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { useThree, useFrame } from "@react-three/fiber";
import { CameraControls  } from "@react-three/drei";
import { ModeType, RoomType } from '@/types/types';

interface RigProps {
    position?: THREE.Vector3;
    focus?: THREE.Vector3;
    mode: ModeType;
    room: RoomType | null;
    inTransition: boolean;
    setInTransition: React.Dispatch<React.SetStateAction<boolean>>;
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
    inTransition,
    setInTransition
}: RigProps) {
    const { controls, scene } = useThree();
    const [transition, setTransition] = useState(false);
    const [initialCameraPoint, setInitialCameraPoint] = useState({x:0, y:0, z:0});
    const lerpSpeed: number = 0.0005;

    function lerpWithCircleConstraint(
        currentX: number, 
        currentY: number, 
        targetX: number, 
        targetY: number, 
        alpha: number, 
        centerX: number, 
        centerY: number, 
        radius: number
    ): { a: number, b: number } {
        return { a: currentX, b: currentY };
        let newX = currentX + (targetX - currentX) * alpha;
        let newY = currentY + (targetY - currentY) * alpha;
    
        const dx = newX - centerX;
        const dy = newY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
    
        if (dist > radius) {
            newX = centerX + (dx / dist) * radius;
            newY = centerY + (dy / dist) * radius;
        }
    
        return { a: newX, b: newY };
    }

    function getRoomPosTarget(
        room: RoomType, 
        mode: ModeType, 
        cameraPos: {x: number, y: number, z: number}, 
        fixedTargetX: number, 
        fixedTargetY: number
    ) {
        if (mode === "OpenBox") {
            const { a, b } = lerpWithCircleConstraint(
                cameraPos.x, cameraPos.y, 
                fixedTargetX, fixedTargetY, 
                lerpSpeed, 
                initialCameraPoint.x, initialCameraPoint.y, 
                1
            )
            return {
                x: a,
                y: b,
                z: cameraPos.z,
                tx: a,
                ty: b,
                tz: cameraPos.z - 0.1
            };
        }
    
        switch (room) {
            case "AboutMe": {
                const { a, b } = lerpWithCircleConstraint(
                    cameraPos.x, cameraPos.y, 
                    fixedTargetX, fixedTargetY, 
                    lerpSpeed, 
                    initialCameraPoint.x, initialCameraPoint.y, 
                    1
                )
                return {
                    x: a,
                    y: b,
                    z: cameraPos.z,
                    tx: a,
                    ty: b,
                    tz: cameraPos.z - 0.1
                };
            }
            case "Contact": {
                const { a, b } = lerpWithCircleConstraint(
                    cameraPos.x, cameraPos.z, 
                    fixedTargetY, -fixedTargetX, 
                    lerpSpeed, 
                    initialCameraPoint.x, initialCameraPoint.z, 
                    1
                )
                return {
                    x: a,
                    y: cameraPos.y,
                    z: b,
                    tx: a,
                    ty: cameraPos.y + 0.1,
                    tz: b
                };
            }
            case "CV": {
                const { a, b } = lerpWithCircleConstraint(
                    cameraPos.x, cameraPos.z, 
                    fixedTargetX, -fixedTargetY, 
                    lerpSpeed, 
                    initialCameraPoint.x, initialCameraPoint.z, 
                    1
                )
                return {
                    x: a,
                    y: cameraPos.y,
                    z: b,
                    tx: a,
                    ty: cameraPos.y - 0.1,
                    tz: b
                }
            };
            case "Experience": {
                const { a, b } = lerpWithCircleConstraint(
                    cameraPos.y, cameraPos.z, 
                    fixedTargetY, -fixedTargetX, 
                    lerpSpeed, 
                    initialCameraPoint.y, initialCameraPoint.z, 
                    1
                )
                return {
                    x: cameraPos.x,
                    y: a,
                    z: b,
                    tx: cameraPos.x - 0.1,
                    ty: a,
                    tz: b
                };
            }
            case "Projects": {
                const { a, b } = lerpWithCircleConstraint(
                    cameraPos.x, cameraPos.y, 
                    -fixedTargetX, fixedTargetY, 
                    lerpSpeed, 
                    initialCameraPoint.x, initialCameraPoint.y, 
                    1
                )
                return {
                    x: a,
                    y: b,
                    z: cameraPos.z,
                    tx: a,
                    ty: b,
                    tz: cameraPos.z + 0.1
                };
            }
            default: {
                const { a, b } = lerpWithCircleConstraint(
                    cameraPos.y, cameraPos.z, 
                    fixedTargetY, fixedTargetX, 
                    lerpSpeed, 
                    initialCameraPoint.y, initialCameraPoint.z, 
                    1
                )
                return {
                    x: cameraPos.x,
                    y: a,
                    z: b,
                    tx: cameraPos.x + 0.1,
                    ty: a,
                    tz: b
                };
            }
        }
    }

    useFrame((state) => {
        return
        console.log('inTransition', inTransition)
        if (!room || transition || inTransition) return;

        const targetX: number = (state.pointer.x * state.viewport.width) * 5; 
        const targetY: number = (state.pointer.y * state.viewport.height) * 5;

        const fixedTargetX: number = parseFloat(targetX.toFixed(2)); 
        const fixedTargetY: number = parseFloat(targetY.toFixed(2));

        const posTarget: PosTarget = getRoomPosTarget(room, mode, state.camera.position, fixedTargetX, fixedTargetY);

        if (controls && (controls as any).setPosition) {
            (controls as any).setTarget(posTarget.tx, posTarget.ty, posTarget.tz, false);
            (controls as any).setPosition(posTarget.x, posTarget.y, posTarget.z, false);
        } else {
            console.error("Controls not available or setPosition method is missing.");
        }
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
        setInTransition(false)
    }

    async function openTransition() {
        await (controls as any)?.setLookAt(1, 0, 4, 1, 0, -1, true);
        setInitialCameraPoint({x: 1, y: 0, z: 0})
    }

    async function teseractTransition() {
        await (controls as any)?.setLookAt(3, 3, 3, 0, 0, -1, true);
    }

    async function roomTransition(room: RoomType) {
        //setTransition(true)
        const active = scene.getObjectByName(room);
        if (active) {
            active.parent?.localToWorld(position.set(0, 0, 1));
            active.parent?.localToWorld(focus.set(0, 0, -1));
        }
        await (controls as any)?.setLookAt(...position.toArray(), ...focus.toArray(), true);
        setInitialCameraPoint({x: position.x, y: position.y, z: position.z})
        console.log("C")
        setInTransition(false)
        console.log("setInTransition", inTransition)
    }

    useEffect(() => {
        if (room) {
            console.log("A")
            setInTransition(true)
            roomTransition(room)
        } else {
            switch (mode) {
                case "InitialBox":
                    console.log("B")
                    setInTransition(true)
                    initialTransition();
                    break;
                case "OpenBox":
                    // setInTransition(true)
                    openTransition()
                    break;
                case "Teseract":
                    // setInTransition(true)
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
