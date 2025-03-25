import { useEffect, useState } from 'react';
import NavigationPanel from './NavigationPanel';
import ButtonIcon from './ButtonIcon';
import PanelInfo from './PanelInfo';
import { ModeType, RoomType } from '@/types/types';
import { assets } from '../../assets/assets'

type MainUIProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
  inTransition: boolean;
  setInTransition: React.Dispatch<React.SetStateAction<boolean>>;
  panel: string | null;
  setPanel: React.Dispatch<React.SetStateAction<string | null>>;
};

const MainUI = ({ 
  mode, setMode, 
  room, setRoom,
  inTransition, setInTransition, 
  panel, setPanel 
}: MainUIProps) => {
  const [showBack, setShowBack] = useState(false);
  console.log(inTransition, setInTransition)
  useEffect(() => {
    if (room !== null) {
      const timer = setTimeout(() => {
        setShowBack(true);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setShowBack(false);
    }
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
      }}
    >
      {mode !== 'InitialBox' && (
        room && showBack? (
          <ButtonIcon
            style={{
              position: 'absolute',
              top: '40px',
              left: 40,
            }}
            svgPath={assets.svg.back}
            onClick={() => setRoom(null)}
          />
        ) : (
          <ButtonIcon
            style={{
              position: 'absolute',
              top: '40px',
              right: 40,
            }}
            svgPath={mode === 'Teseract' ? assets.svg.logo : assets.svg.cube}
            onClick={() => setMode(mode === 'Teseract' ? 'OpenBox' : 'Teseract')}
          />
        )
      )}

      {panel &&
        <PanelInfo panel={panel} setPanel={setPanel}/>
      }

      <NavigationPanel mode={mode} setMode={setMode} room={room} setRoom={setRoom} />
    </div>
  );
};

export default MainUI;
