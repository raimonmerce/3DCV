import React from 'react';
import './ButtonIcon.css';
import Icon from './Icon';

type ButtonIconProps = {
  onClick: () => void;
  svgPath?: string;
  style?: React.CSSProperties;
  size?: string;
};

const ButtonIcon = ({ svgPath, onClick, style, size = '40px' }: ButtonIconProps) => {
  return (
    <button
      className="button-icon"
      style={style}
      onClick={onClick}
    >
      <Icon svgPath={svgPath} size={size} />
    </button>
  );
};

export default ButtonIcon;
