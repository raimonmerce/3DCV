import { useEffect, useState } from 'react';
import NavigationPanel from './NavigationPanel';
import ButtonIcon from './ButtonIcon';
import { ModeType, RoomType } from '@/types/types';
import { assets } from '../../assets/assets'

type MainUIProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

const MainUI = ({ mode, setMode, room, setRoom }: MainUIProps) => {
  const [showBack, setShowBack] = useState(false);

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
            position="left"
            svgPath={assets.svg.back}
            onClick={() => setRoom(null)}
          />
        ) : (
          <ButtonIcon
            position="right"
            svgPath={mode === 'Teseract' ? assets.svg.logo : assets.svg.cube}
            onClick={() => setMode(mode === 'Teseract' ? 'OpenBox' : 'Teseract')}
          />
        )
      )}

      <NavigationPanel mode={mode} setMode={setMode} room={room} setRoom={setRoom} />
    </div>
  );
};

export default MainUI;
