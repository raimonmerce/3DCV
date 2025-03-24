import { useState } from 'react';

type IconProps = {
  svgPath?: string;
};

const Icon = ({ svgPath }: IconProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
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
    </div>
  );
};

export default Icon;