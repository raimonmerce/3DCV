import React from 'react';
import Button from './Button';
import { ModeType, RoomType } from '@/types/types';

type NavigationPanelProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

const NavigationPanel = ({ mode, setMode, room, setRoom }: NavigationPanelProps) => {

  const goToRoom = (room: RoomType) => {
    if (mode === "InitialBox") {
      setMode("OpenBox");
      setTimeout(() => setRoom(room), 1500);
    } else {
      setRoom(room);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        color: 'white',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
        {room ? 
        <Button position="left" fontSize={'40px'} svgPath={mode === 'Teseract'? "/cube.svg" : "/logo.svg"} onClick={() => setRoom(null)}>
            {'<'}
        </Button>
        : 
        <Button position="right" svgPath={mode === 'Teseract'? "/logo.svg" : "/cube.svg"} onClick={() => setMode(mode === 'Teseract'? 'OpenBox' : 'Teseract')}/>
        }

      <Button position="left" top="240px" onClick={() => goToRoom('Experience')}>
        EXPERIENCE
      </Button>
      <Button position="left" top="280px" onClick={() => goToRoom('Projects')}>
        PROJECTS
      </Button>
      <Button position="left" top="320px" onClick={() => goToRoom('Studies')}>
        STUDIES
      </Button>
      <Button position="left" top="360px" onClick={() => goToRoom('AboutMe')}>
        ABOUT ME
      </Button>
      <Button position="left" top="400px" onClick={() => goToRoom('CV')}>
        CV
      </Button>
      <Button position="left" top="440px" onClick={() => goToRoom('Contact')}>
        CONTACT
      </Button>
    </div>
  );
};

export default NavigationPanel;
