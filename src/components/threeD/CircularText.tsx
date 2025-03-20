import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

type CircularTextProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
};

export default function CircularText({position = [0, 0, 0], rotation = [0, 0, 0]}: CircularTextProps) {
    const [rotationText, setRotationText] = useState(0);
    useFrame((state, delta) => {
        setRotationText((prev) => prev + delta); // Rotate HTML content
    });

  return (
    <group
        rotation={rotation}
        position={position}
    >
        <Html 
            center 
            transform
            // rotation={[0, 0, rotationText]}
        >
            <div
            style={{
                position: "absolute",
                width: "250px",
                height: "250px",
                transform: `translate(0%, 0%) rotate(${rotationText}rad)`,
                transformOrigin: "center",
            }}
            >
            <svg width="250" height="250">
                <path id="curve" d="M 25 125 A 75 75 0 1 1 25 127" fill="transparent">
                </path>
                <text>
                <textPath href="#curve" fill="white" fontSize={"20px"}>
                    Click the Box to Open &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Click the Box to Open
                </textPath>
                </text>
            </svg>
            </div>
        </Html>
    </group>
  );
}
