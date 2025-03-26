import React from 'react';
import ButtonNav from './ButtonNav';
import { ModeType, RoomType } from '@/types/types';
import './NavigationPanel.css'; 

type NavigationPanelProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
  isNavPanelVisible: boolean;
};

const NavigationPanel = ({ mode, setMode, room, setRoom, isNavPanelVisible }: NavigationPanelProps) => {

  const goToRoom = (room: RoomType) => {
    if (mode === "InitialBox") {
      setMode("OpenBox");
      setTimeout(() => setRoom(room), 1500);
    } else {
      setRoom(room);
    }
  };

  return (
    <div className={`navigation-panel ${isNavPanelVisible ? 'show' : ''}`}>
      <ButtonNav text={"EXPERIENCE"} selected={room === "Experience"} onClick={() => goToRoom('Experience')}/>
      <ButtonNav text={"PROJECTS"} selected={room === "Projects"} onClick={() => goToRoom('Projects')}/>
      <ButtonNav text={"STUDIES"} selected={room === "Studies"} onClick={() => goToRoom('Studies')}/>
      <ButtonNav text={"ABOUT ME"} selected={room === "AboutMe"} onClick={() => goToRoom('AboutMe')}/>
      <ButtonNav text={"CONTACT"} selected={room === "Contact"} onClick={() => goToRoom('Contact')}/>
      <ButtonNav text={"CV"} selected={room === "CV"} onClick={() => goToRoom('CV')}/>
    </div>
  );
};

export default NavigationPanel;
