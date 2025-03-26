import './Footer.css';

type ButtonIconProps = {
  instruction?: string | null;
};

const Footer = ({ instruction }: ButtonIconProps) => {
  return (
    <div className="footer">
      {instruction &&
        <div className="footer-text">{instruction}</div>
      }
      <p>Made by Raimon Mercé</p>
    </div>
  );
};

export default Footer;