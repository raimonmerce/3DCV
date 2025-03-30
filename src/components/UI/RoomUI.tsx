import { RoomType } from '@/types/types';
import { assets } from '../../assets/assets';
import ButtonIcon from './components/ButtonIcon';
import AboutMeUI from './rooms/AboutMeUI';
import ContactUI from './rooms/ContactUI';
import CVUI from './rooms/CVUI';
import ExperienceUI from './rooms/ExperienceUI';
import ProjectsUI from './rooms/ProjectsUI';
import StudiesUI from './rooms/StudiesUI';
import { useState, useEffect } from 'react';
import './RoomUI.css';

type RoomUIProps = {
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

const fadeDuration = 2000;

export default function RoomUI({ room, setRoom }: RoomUIProps) {
  const [displayedRoom, setDisplayedRoom] = useState<RoomType | null>(room);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeInFirst, setFadeInFirst] = useState(false);

  useEffect(() => {
    if (!displayedRoom && room) {
      setDisplayedRoom(room);
      setTimeout(() => {
        setFadeInFirst(true);
      }, 100);
    }
    
    if (room !== displayedRoom) {
      setFadeIn(false);
      setFadeInFirst(false);
      const timer = setTimeout(() => {
        setDisplayedRoom(room);
        if (room) {
          setFadeIn(true);
          setTimeout(() => {
            const roomContent = document.querySelector('.room-content');
            if (roomContent) {
              roomContent.scrollTop = 0;
            }
          }, 50);
        }
      }, fadeDuration);
      return () => clearTimeout(timer);
    }
  }, [room, displayedRoom]);

  if (!displayedRoom) return null;

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
      <div className={`room-container ${fadeIn ? 'room-fadeIn' : 'room-fadeOut'} ${fadeInFirst ? 'room-fadeInFirst' : 'room-fadeOut'}`}>
        <h1 className='room-title'>{displayedRoom}</h1>
        <div className='room-content'>
          {(() => {
            switch (displayedRoom) {
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
