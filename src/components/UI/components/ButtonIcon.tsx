import Icon from './Icon';

type ButtonIconProps = {
  onClick: () => void;
  svgPath?: string;
  style?: React.CSSProperties;
};

const ButtonIcon = ({ svgPath, onClick, style }: ButtonIconProps) => {
  return (
    <button
      style={{
        fontSize: '20px',
        pointerEvents: 'auto',
        cursor: 'pointer',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        border: 0,
        ...style,
      }}
      onClick={onClick}
    >
      <Icon svgPath={svgPath}/>
    </button>
  );
};

export default ButtonIcon;