import { useState, useEffect, useRef } from 'react';
import './Icon.css';

type IconProps = {
  svgPath?: string;
  size?: string;
};

const Icon = ({ svgPath, size = '40px' }: IconProps) => {
  const [hovered, setHovered] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={iconRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`icon-container ${fadeIn ? 'fade-in' : ''}`}
    >
      <img
        src={svgPath}
        alt="icon"
        className={`icon-image ${hovered ? 'hovered' : ''}`}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Icon;
