import { useState } from 'react';
import { Outlines } from '@react-three/drei';
import { ModeType } from '@/types/types';

type InitialBoxProps = {
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

export default function InitialBox({ 
    setMode
}: InitialBoxProps) {

    const [hovered, setHovered] = useState(false);

    const handlePointerOver = () => {
        setHovered(true);
    };

    const handlePointerOut = () => {
        setHovered(false);
    };

    const handleClick = () => {
        setMode("OpenBox");
    };

    return (
        <mesh 
            position={[0, 0, -1]} 
            onPointerOver={handlePointerOver} 
            onPointerOut={handlePointerOut} 
            onClick={handleClick}
        >
            <boxGeometry args={[2, 2, 2]} />
            <meshPhongMaterial color={'#98FB98'} />
            {hovered && <Outlines thickness={10} color="white" />}
        </mesh>
    );
}
