import { useFrame } from '@react-three/fiber';
import * as TWEEN from '@tweenjs/tween.js';

export default function Tween() {

    useFrame(() => {
        TWEEN.update();
    });

    return (
        <></>
    );
}