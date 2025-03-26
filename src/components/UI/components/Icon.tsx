import { useState, useEffect, useRef } from 'react';

type IconProps = {
  svgPath?: string;
  size?: string;
};

const Icon = ({ svgPath, size = '40px' }: IconProps) => {
  const [hovered, setHovered] = useState(false);
  const [fadeIn, setFadeIn] = useState(false); // State for fade-in effect
  const iconRef = useRef<HTMLDivElement | null>(null); // Reference to the icon container

  useEffect(() => {
    // Set fadeIn to true after the component mounts
    const timeout = setTimeout(() => setFadeIn(true), 100); // Delay the fade-in effect
    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <div
      ref={iconRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: fadeIn ? 1 : 0, // Apply fade-in effect
        transition: 'opacity 0.5s ease', // Smooth fade-in transition
      }}
    >
      <img
        src={svgPath}
        alt="icon"
        style={{
          width: size,
          height: size,
          marginRight: '8px',
          filter: hovered
            ? 'brightness(0) saturate(100%) invert(60%)'
            : 'brightness(0) saturate(100%) invert(100%)',
          transition: 'filter 0.2s ease',
        }}
      />
    </div>
  );
};

export default Icon;
