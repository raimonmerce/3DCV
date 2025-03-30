import './Footer.css';

type ButtonIconProps = {
  instruction?: string | null;
};

const Footer = ({ instruction }: ButtonIconProps) => {
  return (
    <div className="footer">
      {instruction &&
        <div className="footer-text instrucctions-text">{instruction}</div>
      }
      <div className="footer-text">Made by Raimon Mercé</div>
    </div>
  );
};

export default Footer;