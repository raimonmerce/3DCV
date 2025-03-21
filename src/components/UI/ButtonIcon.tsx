import { useState } from 'react';

type ButtonIconProps = {
  position: 'left' | 'right';
  onClick: () => void;
  svgPath?: string;
};

const ButtonIcon = ({ position, onClick, svgPath}: ButtonIconProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      style={{
        position: 'absolute',
        top: '40px',
        [position]: 40,
        fontSize: '20px',
        pointerEvents: 'auto',
        cursor: 'pointer',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        color: hovered ? 'gray' : 'white',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {svgPath && (
        <img
            src={svgPath}
            alt="icon"
            style={{
            width: '40px',
            height: '40px',
            marginRight: '8px',
            filter: hovered
                ? 'brightness(0) saturate(100%) invert(60%)'
                : 'brightness(0) saturate(100%) invert(100%)',
            transition: 'filter 0.2s ease',
            }}
        />
      )}
    </a>
  );
};

export default ButtonIcon;