import Scene from "./components/threeD/Scene";
import MainUI from "./components/UI/MainUI";
import './styles/global.css';
import { ModeType, RoomType } from '@/types/types';
import { useEffect, useState } from 'react'

export default function App() {
  const [mode, setMode] = useState<ModeType>('InitialBox');
  const [room, setRoom] = useState<RoomType | null>(null);
  const [inTransition, setInTransition] = useState<boolean>(false);
  
  useEffect(() => {
    setInTransition(true)
  }, [mode, room]);
  
  return (
    <div className="maindiv">
      <MainUI 
        mode={mode} setMode={setMode} 
        room={room} setRoom={setRoom}
        inTransition={inTransition} setInTransition={setInTransition}
      />
      <Scene
        mode={mode} setMode={setMode} 
        room={room} setRoom={setRoom}
        inTransition={inTransition} setInTransition={setInTransition}
      />
    </div>
  );
}
