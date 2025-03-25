import Scene from "./components/threeD/Scene";
import MainUI from "./components/UI/MainUI";
import './styles/global.css';
import { ModeType, RoomType } from '@/types/types';
import { useState } from 'react'

export default function App() {
  const [mode, setMode] = useState<ModeType>('InitialBox');
  const [room, setRoom] = useState<RoomType | null>(null);
  const [inTransition, setInTransition] = useState<boolean>(false);
  const [panel, setPanel] = useState<string | null>(null);

  return (
    <div className="maindiv">
      <MainUI 
        mode={mode} setMode={setMode} 
        room={room} setRoom={setRoom}
        inTransition={inTransition} setInTransition={setInTransition}
        panel={panel} setPanel={setPanel}
      />
      <Scene
        mode={mode} setMode={setMode} 
        room={room} setRoom={setRoom}
        inTransition={inTransition} setInTransition={setInTransition}
        setPanel={setPanel}
      />
    </div>
  );
}
