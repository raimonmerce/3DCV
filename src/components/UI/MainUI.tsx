import NavigationPanel from './components/NavigationPanel';
import InitialBoxUI from './InitialBoxUI';
import OpenBoxUI from './OpenBoxUI';
import RoomUI from './RoomUI';
import TeseractUI from './TeseractUI';
import { ModeType, RoomType } from '@/types/types';

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
      {room ? (
        <RoomUI room={room} setRoom={setRoom} />
      ) : mode === "OpenBox" ? (
        <OpenBoxUI setMode={setMode} />
      ) : mode === "Teseract" ? (
        <TeseractUI setMode={setMode} />
      ) : mode === "InitialBox" ? (
        <InitialBoxUI/>
      ) : null}
      <NavigationPanel mode={mode} setMode={setMode} room={room} setRoom={setRoom} />
    </div>
  );
};

export default MainUI;
