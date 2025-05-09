import { useEffect, useState } from 'react';
import { Outlines } from '@react-three/drei';
import { ModeType } from '@/types/types';
import * as TWEEN from '@tweenjs/tween.js';
import { getCssVariableValue } from '../../utils/utils';

type InitialBoxProps = {
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

export default function InitialBox({ 
    setMode
}: InitialBoxProps) {
    const [hovered, setHovered] = useState(false);
    const [outlineOpacity, setOutlineOpacity] = useState(0);
    const rootStyles = getComputedStyle(document.documentElement);

    useEffect(() => {
        if (!hovered) {
            setOutlineOpacity(0);
            return;
        }

        const tween = new TWEEN.Tween({ value: 0 })
            .to({ value: 1 }, 750)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate((obj) => {
                setOutlineOpacity(obj.value);
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();

        return () => {
            tween.stop();
        };
    }, [hovered]);

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
            <meshStandardMaterial color={getCssVariableValue("--color-cube")} />
            {hovered && 
            <Outlines 
                thickness={10} 
                transparent 
                opacity={outlineOpacity} 
                color={rootStyles.getPropertyValue('--color-cube-outline').trim()} 
            />}
        </mesh>
    );
}
