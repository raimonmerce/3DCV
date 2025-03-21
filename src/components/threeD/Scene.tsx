import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import Teseract from "./Teseract";
import Tween from "./Tween";
import Rig from './Rig';  
import { getCssVariableValue } from '../../utils/utils';
import { ModeType, RoomType } from '@/types/types';

type SceneProps = {
    mode: ModeType;
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
    room: RoomType | null;
    setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

export default function Scene({ 
    mode, 
    setMode,
    room,
    setRoom
  }: SceneProps) {
   
    return (
        <Canvas 
            style={{
                background: `linear-gradient(to bottom, ${getCssVariableValue("--color-primary")}, ${getCssVariableValue("--color-secondary")})`,
                height: '100vh',
            }}
            camera={{ position: [2, 2, 5] }}
        >
            <Tween />
            <ambientLight intensity={0.5} />
            <pointLight intensity={10} position={[3, 3, 3]} />
            <pointLight intensity={10} position={[-3, -3, -3]} />
            <Teseract mode={mode} setMode={setMode} room={room} setRoom={setRoom}/>
            {/* <CircularText rotation={[-Math.PI/2, 0, 0]}/> */}
            <Rig mode={mode} room={room}/>
            {/* <Stats/> */}
        </Canvas>
    );
}