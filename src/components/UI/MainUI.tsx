import NavigationPanel from './components/NavigationPanel';
import InitialBoxUI from './InitialBoxUI';
import OpenBoxUI from './OpenBoxUI';
import RoomUI from './RoomUI';
import TeseractUI from './TeseractUI';
import { ModeType, RoomType } from '@/types/types';
import { useState, useEffect } from 'react'
import ButtonIcon from './components/ButtonIcon';
import Footer from './components/Footer';
import {assets} from '../../assets/assets'

type MainUIProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

const MainUI = ({ 
  mode, setMode, 
  room, setRoom
}: MainUIProps) => {

  const [isNavPanelVisible, setIsNavPanelVisible] = useState(false);

  const toggleNavPanel = () => {
    setIsNavPanelVisible(prev => !prev);
  };

  useEffect(() => {
    setIsNavPanelVisible(false)
  }, [room]);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        color: 'white',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflowX: 'hidden',
        overflowY: 'auto', 
      }}
    >
      <RoomUI room={room} setRoom={setRoom} />
      {mode === "OpenBox" ? (
        <OpenBoxUI setMode={setMode}/>
      ) : mode === "Teseract" ? (
        <TeseractUI setMode={setMode}/>
      ) : mode === "InitialBox" ? (
        <InitialBoxUI/>
      ) : null}

      <ButtonIcon
        style={{
          position: 'absolute',
          top: '45px',
          right: '30px',
        }}
        svgPath={assets.svg.menu}
        onClick={toggleNavPanel}
        size={'30px'}
      />
      <NavigationPanel 
        mode={mode} 
        setMode={setMode} 
        room={room} 
        setRoom={setRoom} 
        isNavPanelVisible={isNavPanelVisible}
      /> 
      <Footer
        instruction={
          room
            ? null
            : mode === 'OpenBox' || mode === 'Teseract'
            ? 'Double click to enter a Portal'
            : mode === 'InitialBox'
            ? 'Click the Box to start'
            : null
        }
      />
    </div>
  );
};

export default MainUI;
