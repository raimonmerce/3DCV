import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls, Stats } from "@react-three/drei";
import Teseract from "./Teseract";
import InitialBox from "./InitialBox";
import CircularText from "./CircularText";
// import Tween from "./Tween";
import { useRoute } from 'wouter'
import { getCssVariableValue } from '../../utils/utils';
import { ModeType } from '@/types/types';

interface RigProps {
    position?: THREE.Vector3
    focus?: THREE.Vector3
}

type SceneProps = {
    mode: ModeType;
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

export default function Scene({ 
    mode, 
    setMode
  }: SceneProps) {
    function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }: RigProps) {
        const { controls, scene } = useThree()
        const [, params] = useRoute('/:id')
      
        useEffect(() => {
            console.log('params', params)
            if (params?.id) {
                const active = scene.getObjectByName(params.id)
                if (active) {
                active.parent?.localToWorld(position.set(0, 1, 0.25))
                active.parent?.localToWorld(focus.set(0, 0, -1))
                }
                controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
                //controls?.setOrbitPoint(focus.x, focus.y, focus.z)
            } else {
                controls?.setLookAt(0, 0, 6, 0, 0, -1, true)
            }
        }, [params?.id, scene, position, focus, controls])
      
        return <CameraControls 
            makeDefault 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 2} 
            minDistance={1}
            maxDistance={10}
        />
      }
    
    return (
        <Canvas 
            style={{
                background: `linear-gradient(to bottom, ${getCssVariableValue("--color-primary")}, ${getCssVariableValue("--color-secondary")})`,
                height: '100vh',
            }}
            camera={{ position: [2, 2, 5] }}
        >
            {/* <Tween /> */}
            <ambientLight intensity={0.5} />
            <spotLight position={[2, 2, 2]} />
            {mode === 'InitialBox' && <InitialBox setMode={setMode}/>}
            <Teseract setMode={setMode}/>
            {/* <CircularText rotation={[-Math.PI/2, 0, 0]}/> */}
            <Rig/>
            <Stats/>
        </Canvas>
    );
}