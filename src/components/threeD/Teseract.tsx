import { useEffect, useRef } from "react";
import Side from "./Side";
import AboutMe from "./rooms/AboutMe";
import Contact from "./rooms/Contact";
import Experience from "./rooms/Experience";
import Intro from "./rooms/Intro";
import Projects from "./rooms/Projects";
import Studies from "./rooms/Studies";
import { ModeType, RoomType } from '@/types/types';
import * as TWEEN from '@tweenjs/tween.js';
import { Mesh } from 'three';

type TeseractBoxProps = {
    mode: ModeType;
    room: RoomType | null;
    setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

export default function Teseract({ 
    mode,
    room,
    setRoom
}: TeseractBoxProps) {
    const gear1 = useRef<Mesh>(null);
    const gear2 = useRef<Mesh>(null);
    const gear3 = useRef<Mesh>(null);
    const gear4 = useRef<Mesh>(null);
    const gear5 = useRef<Mesh>(null);
    const box = useRef<Mesh>(null);

    useEffect(() => {
        if (!gear1.current || !(mode === 'InitialBox' || mode === 'OpenBox' || mode === 'Teseract')) return
        console.log("mode", mode)
        let to
        if (mode === 'InitialBox') to = { pos: -2, rot: -Math.PI/2}
        else if (mode === 'OpenBox') to = { pos: -1, rot: 0}
        else to = { pos: 0, rot: Math.PI/2}
        const initialPosition = box.current?.position.z
        const initialRotation = gear1.current?.rotation.y
        if (initialPosition === undefined || initialRotation === undefined) return
        const tween = new TWEEN.Tween({pos: initialPosition, rot: initialRotation})
        .to(to, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate((obj) => {
            box.current?.position.set(0, 0, obj.pos)
            gear1.current?.rotation.set(0, obj.rot, 0)
            gear2.current?.rotation.set(0, obj.rot, 0)
            gear3.current?.rotation.set(obj.rot, 0, 0)
            gear4.current?.rotation.set(0, -obj.rot, 0)
            gear5.current?.rotation.set(-obj.rot, 0, 0)
        })
        .start();
    }, [mode]); 

    return (
        <group ref={box} position={[0, 0, -2]} >
            <Side 
                name="Intro"
                bg="orange"
                mode={mode}
                room={room} 
                setRoom={setRoom}
            >
                <Intro/>
            </Side>
            <group ref={gear1} position={[1, 0, 0]} rotation={[0, -Math.PI/2, 0]}>
                <group position={[1, 0, 0]}>
                    <Side 
                        name="Experience"
                        bg="lightblue" 
                        mode={mode}
                        room={room}
                        setRoom={setRoom}
                    >
                        <Experience/>
                    </Side>
                    <group ref={gear2} position={[1, 0, 0]} rotation={[0, -Math.PI/2, 0]}>
                        <group position={[1, 0, 0]}>
                            <Side 
                                name="Projects"
                                bg="lightgreen" 
                                mode={mode}
                                room={room}
                                setRoom={setRoom} 
                            >
                                <Projects/>
                            </Side>
                        </group>
                    </group>
                    <group ref={gear3} position={[0, -1, 0]} rotation={[-Math.PI/2, 0, 0]}>  
                        <group position={[0, -1, 0]}>
                            <Side 
                                name="Contact"
                                bg="hotpink" 
                                mode={mode}
                                room={room}
                                setRoom={setRoom}
                            >
                                <Contact/>
                            </Side>   
                        </group>
                    </group>
                </group>
            </group>
            <group ref={gear4} position={[-1, 0, 0]} rotation={[0, Math.PI/2, 0]}>
                <group position={[-1, 0, 0]}>
                    <Side 
                        name="Studies"
                        bg="aquamarine" 
                        mode={mode}
                        room={room}
                        setRoom={setRoom}
                    >
                        <Studies/>
                    </Side>
                    </group>
                </group>
            <group ref={gear5} position={[0, 1, 0]} rotation={[Math.PI/2, 0, 0]}>
                <group position={[0, 1, 0]}>
                    <Side
                        name="AboutMe"
                        bg="indianred" 
                        mode={mode}
                        room={room}
                        setRoom={setRoom}
                    >
                        <AboutMe/>
                    </Side>
                </group>
            </group>
        </group>
    );
}