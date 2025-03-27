import React from 'react';
import './ButtonIcon.css';
import Icon from './Icon';

type ButtonIconProps = {
  onClick: () => void;
  svgPath?: string;
  style?: React.CSSProperties;
  size?: string;
  text?: string;
};

const ButtonIcon = ({ svgPath, onClick, style, size = '40px', text }: ButtonIconProps) => {
  return (
    <div>
      <button
        className="button-icon"
        style={style}
        onClick={onClick}
      >
        <Icon svgPath={svgPath} size={size} />
        {text}
      </button>
    </div>
  );
};

export default ButtonIcon;
