import Scene from "./components/threeD/Scene";
import MainUI from "./components/UI/MainUI";
import './styles/global.css';
import { ModeType } from '@/types/types';
import { useState } from 'react'

export default function App() {
  const [mode, setMode] = useState<ModeType>('InitialBox');
  return (
    <div className="maindiv">
      <MainUI mode={mode} setMode={setMode}/>
      <Scene mode={mode} setMode={setMode}/>
    </div>
  );
}
