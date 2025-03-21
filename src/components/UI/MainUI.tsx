import React from 'react';
import NavigationPanel from './NavigationPanel';
import { ModeType, RoomType } from '@/types/types';

type MainUIProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

const MainUI = ({ mode, setMode, room, setRoom }: MainUIProps) => {
  return (
    <NavigationPanel mode={mode} setMode={setMode} room={room} setRoom={setRoom} />
  );
};

export default MainUI;
