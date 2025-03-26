import { useEffect, useRef, useState } from "react";
import Side from "./Side";
import AboutMe from "./rooms/AboutMe";
import Contact from "./rooms/Contact";
import Experience from "./rooms/Experience";
import CV from "./rooms/CV";
import Projects from "./rooms/Projects";
import Studies from "./rooms/Studies";
import InitialBox from "./InitialBox";
import { ModeType, RoomType } from '@/types/types';
import * as TWEEN from '@tweenjs/tween.js';
import { Mesh } from 'three';
import {assets} from '../../assets/assets'
import { getCssVariableValue } from '../../utils/utils';

type TeseractBoxProps = {
    mode: ModeType;
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
    room: RoomType | null;
    setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
    inTransition: boolean;
    setInTransition: React.Dispatch<React.SetStateAction<boolean>>;
    setPanel: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function Teseract({ 
    mode,
    setMode,
    room,
    setRoom,
    inTransition,
    setInTransition,
    setPanel
}: TeseractBoxProps) {
    const [animationFinished, setAnimationFinished] = useState(true);
    const gear1 = useRef<Mesh>(null);
    const gear2 = useRef<Mesh>(null);
    const gear3 = useRef<Mesh>(null);
    const gear4 = useRef<Mesh>(null);
    const gear5 = useRef<Mesh>(null);
    const box = useRef<Mesh>(null);

    useEffect(() => {
        if (!gear1.current || !['InitialBox', 'OpenBox', 'Teseract'].includes(mode)) return;
        
        const modeConfig = {
            InitialBox: { pos: -2, rot: -Math.PI / 2 },
            OpenBox: { pos: -1, rot: 0 },
            Teseract: { pos: 0, rot: Math.PI / 2 }
        };
    
        const { pos, rot } = modeConfig[mode];
        const initialPosition = box.current?.position.z;
        const initialRotation = gear1.current?.rotation.y;
    
        if (initialPosition === undefined || initialRotation === undefined) return;
        setAnimationFinished(false)
        new TWEEN.Tween({ pos: initialPosition, rot: initialRotation })
            .to({ pos, rot }, 2000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((obj) => {
                box.current?.position.set(0, 0, obj.pos);
                gear1.current?.rotation.set(0, obj.rot, 0);
                gear2.current?.rotation.set(0, obj.rot, 0);
                gear3.current?.rotation.set(obj.rot, 0, 0);
                gear4.current?.rotation.set(0, -obj.rot, 0);
                gear5.current?.rotation.set(-obj.rot, 0, 0);
            }).onComplete(() => {
                setAnimationFinished(true)
            // }).onStart(() => {
            //     setInTransition(true)
            //     console.log("Start")
            // }).onComplete(() => {
            //     setInTransition(false)
            //     console.log("End")
            })
            .start();
    }, [mode]);

    return (
        <>
            {mode === 'InitialBox' && animationFinished && <InitialBox setMode={setMode}/>}
            <group ref={box} position={[0, 0, -2]} >
                <Side
                    id="AboutMe"
                    title="About Me"
                    url={assets.models.aboutme}
                    color={getCssVariableValue("--color-aboutme")} 
                    mode={mode}
                    room={room}
                    setRoom={setRoom}
                    inTransition={inTransition}
                >
                    <AboutMe setPanel={setPanel}/>
                </Side>
                <group ref={gear1} position={[1, 0, 0]} rotation={[0, -Math.PI/2, 0]}>
                    <group position={[1, 0, 0]}>
                        <Side 
                            id="Experience"
                            title="Experience"
                            url={assets.models.experience}
                            color={getCssVariableValue("--color-experience")} 
                            mode={mode}
                            room={room}
                            setRoom={setRoom}
                            inTransition={inTransition}
                        >
                            <Experience setPanel={setPanel}/>
                        </Side>
                        <group ref={gear2} position={[1, 0, 0]} rotation={[0, -Math.PI/2, 0]}>
                            <group position={[1, 0, 0]}>
                                <Side 
                                    id="Projects"
                                    title="Projects"
                                    url={assets.models.projects}
                                    color={getCssVariableValue("--color-projects")}  
                                    mode={mode}
                                    room={room}
                                    setRoom={setRoom}
                                    inTransition={inTransition}
                                >
                                    <Projects setPanel={setPanel}/>
                                </Side>
                            </group>
                        </group>
                        <group ref={gear3} position={[0, -1, 0]} rotation={[-Math.PI/2, 0, 0]}>  
                            <group position={[0, -1, 0]}>
                                <Side 
                                    id="Contact"
                                    title="Contact"
                                    url={assets.models.contact}
                                    color={getCssVariableValue("--color-contact")} 
                                    mode={mode}
                                    room={room}
                                    setRoom={setRoom}
                                    inTransition={inTransition}
                                >
                                    <Contact setPanel={setPanel}/>
                                </Side>   
                            </group>
                        </group>
                    </group>
                </group>
                <group ref={gear4} position={[-1, 0, 0]} rotation={[0, Math.PI/2, 0]}>
                    <group position={[-1, 0, 0]}>
                        <Side 
                            id="Studies"
                            title="Studies"
                            url={assets.models.studies}
                            color={getCssVariableValue("--color-studies")} 
                            mode={mode}
                            room={room}
                            setRoom={setRoom}
                            inTransition={inTransition}
                        >
                            <Studies setPanel={setPanel}/>
                        </Side>
                        </group>
                    </group>
                <group ref={gear5} position={[0, 1, 0]} rotation={[Math.PI/2, 0, 0]}>
                    <group position={[0, 1, 0]}>
                        <Side 
                            id="CV"
                            title="CV"
                            url={assets.models.cv}
                            color={getCssVariableValue("--color-cv")} 
                            mode={mode}
                            room={room} 
                            setRoom={setRoom}
                            inTransition={inTransition}
                        >
                            <CV setPanel={setPanel}/>
                        </Side>
                    </group>
                </group>
            </group>
        </>
    );
}