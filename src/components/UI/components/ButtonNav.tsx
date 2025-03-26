import './ButtonNav.css'; // Import the CSS file

type ButtonNavProps = {
  text: string;
  selected: boolean;
  onClick: () => void;
};

const ButtonNav = ({ text, selected, onClick }: ButtonNavProps) => {
  return (
    <a
      className={`button-nav ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {text}
    </a>
  );
};

export default ButtonNav;
