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

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob); // Renamed variable
  
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the file", error);
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
      {mode !== 'InitialBox' && (
        room && showBack? (
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
            <ButtonIcon
              style={{
                position: 'absolute',
                top: '40px',
                left: 80,
              }}
              svgPath={assets.svg.download}
              onClick={() => {handleDownload(assets.pdf.cveng, "Raimon_Merce_CV_Eng.pdf")}}
            />
          </>


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
