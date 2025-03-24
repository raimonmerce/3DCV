import Scene from "./components/threeD/Scene";
import MainUI from "./components/UI/MainUI";
import './styles/global.css';
import { ModeType, RoomType } from '@/types/types';
import { useState } from 'react'

export default function App() {
  const [mode, setMode] = useState<ModeType>('InitialBox');
  const [room, setRoom] = useState<RoomType | null>(null);
  
  return (
    <div className="maindiv">
      <MainUI 
        mode={mode} setMode={setMode} 
        room={room} setRoom={setRoom}
      />
      <Scene
        mode={mode} setMode={setMode} 
        room={room} setRoom={setRoom}
      />
    </div>
  );
}
