import { RoomType } from '@/types/types';
import {assets} from '../../assets/assets'
import ButtonIcon from './components/ButtonIcon';
import AboutMeUI from './rooms/AboutMeUI';
import ContactUI from './rooms/ContactUI';
import CVUI from './rooms/CVUI';
import ExperienceUI from './rooms/ExperienceUI';
import ProjectsUI from './rooms/ProjectsUI';
import StudiesUI from './rooms/StudiesUI';
import { useState, useEffect } from 'react';


type RoomUIProps = {
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

export default function RoomUI({
  room,
  setRoom
}: RoomUIProps) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (room) {
      setFadeIn(false);
      const timer = setTimeout(() => {
        setFadeIn(true); // After 2 seconds, set fadeIn to true
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [room]);
  if (!room) return;
  return (
    <>
      <ButtonIcon
        style={{
          position: 'absolute',
          top: '40px',
          left: 40,
        }}
        svgPath={assets.svg.back}
        onClick={() => setRoom(null)}
      />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(65, 65, 65, 0.9)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          fontSize: '20px',
          pointerEvents: 'auto',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '70vw',
          height: '70vh',
          opacity: fadeIn ? 0.8 : 0,
          transition: 'opacity 1s cubic-bezier(0.42, 0, 0.58, 1) 0s, opacity 1s ease-out 0.1s',
          overflow: 'hidden'
        }}>
        <h1 style={{
          marginBlockEnd: 15,
          marginBlockStart: 0,
        }}>{room}</h1>
        <div 
          style={{
            textAlign: 'center',
            overflowY: 'auto',
            maxHeight: '100%',
            width: '100%',
            paddingRight: '10px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
          {(() => {
              switch (room) {
                case 'AboutMe':
                  return <AboutMeUI />;
                case 'Contact':
                  return <ContactUI />;
                case 'CV':
                  return <CVUI />;
                case 'Experience':
                  return <ExperienceUI />;
                case 'Projects':
                  return <ProjectsUI />;
                case 'Studies':
                  return <StudiesUI />;
                default:
                  return null;
              }
            })()}
        </div>
      </div>
    </>
  );
}
