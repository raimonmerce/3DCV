import React, { useState } from 'react';

type ButtonProps = {
  position: 'left' | 'right';
  top?: string;
  onClick: () => void;
  children?: React.ReactNode;
  svgPath?: string;
  fontSize?: string;
};

const Button = ({ position, top = '40px', onClick, children, svgPath, fontSize = '20px' }: ButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      style={{
        position: 'absolute',
        top: top,
        [position]: 40,
        fontSize: fontSize,
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
      {children}
    </a>
  );
};

export default Button;
