import { useState, useEffect } from "react";
import Side from "./Side";
import AboutMe from "./rooms/AboutMe";
import Contact from "./rooms/Contact";
import Experience from "./rooms/Experience";
import Intro from "./rooms/Intro";
import Projects from "./rooms/Projects";
import Studies from "./rooms/Studies";
import { ModeType } from '@/types/types';

type TeseractBoxProps = {
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

export default function Teseract({ 
    setMode
}: TeseractBoxProps) {
    const [rotation, setRotation] = useState(- Math.PI / 2);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setRotation((prevRotation) => {
                const step = 0.1;
                let newRotation = prevRotation;
                switch (event.key) {
                    case "ArrowUp":
                        newRotation = Math.min(prevRotation + step, Math.PI / 2);
                        break;
                    case "ArrowDown":
                        newRotation = Math.max(prevRotation - step, - Math.PI / 2);
                        break;
                    default:
                        return prevRotation;
                }
                return newRotation;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <group position={[0, 0, -2]}>
            <Side 
                name="Intro"
                bg="orange" 
            >
                <Intro/>
            </Side>
            <group position={[1, 0, 0]} rotation={[0, rotation, 0]}>
                <group position={[1, 0, 0]}>
                    <Side 
                        name="Experience"
                        bg="lightblue" 
                    >
                        <Experience/>
                    </Side>
                    <group position={[1, 0, 0]} rotation={[0, rotation, 0]}>
                        <group position={[1, 0, 0]}>
                            <Side 
                                name="Projects"
                                bg="lightgreen" 
                            >
                                <Projects/>
                            </Side>
                        </group>
                    </group>
                    <group position={[0, -1, 0]} rotation={[rotation, 0, 0]}>  
                        <group position={[0, -1, 0]}>
                            <Side 
                                name="Contact"
                                bg="hotpink" 
                            >
                                <Contact/>
                            </Side>   
                        </group>
                    </group>
                </group>
            </group>
            <group position={[-1, 0, 0]} rotation={[0, -rotation, 0]}>
                <group position={[-1, 0, 0]}>
                    <Side 
                        name="Studies"
                        bg="aquamarine" 
                    >
                        <Studies/>
                    </Side>
                    </group>
                </group>
            <group position={[0, 1, 0]} rotation={[-rotation, 0, 0]}>
                <group position={[0, 1, 0]}>
                    <Side
                        name="AboutMe"
                        bg="indianred" 
                    >
                        <AboutMe/>
                    </Side>
                </group>
            </group>
        </group>
    );
}