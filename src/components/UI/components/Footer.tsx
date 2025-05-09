import './Footer.css';

type ButtonIconProps = {
  instruction?: string | null;
};

const Footer = ({ instruction }: ButtonIconProps) => {
  return (
    <div className="footer">
      {instruction && (
        <div className="footer-text instrucctions-text">{instruction}</div>
      )}
      <div className="footer-text">
        <a href="https://github.com/raimonmerce" target="_blank" rel="noopener noreferrer">
          Made by Raimon Mercé
        </a>
      </div>
    </div>
  );
};
export default Footer;