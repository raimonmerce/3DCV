import { useState, useEffect, useRef } from 'react';
import './Icon.css'; // Import the external CSS file

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
