import { assets } from '../../assets/assets'
import ButtonIcon from './ButtonIcon';
import { useEffect, useState } from 'react';

type PanelInfoProps = {
  panel: string;
  setPanel: React.Dispatch<React.SetStateAction<string | null>>;
};

const PanelInfo = ({ panel, setPanel }: PanelInfoProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [panel]);

  function handleOnClick() {
    setPanel(null);
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(65, 65, 65, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '20px',
        pointerEvents: 'auto',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '500px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}>
      <ButtonIcon
        svgPath={assets.svg.close}
        onClick={handleOnClick}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',

        }}
      />
      <div style={{ textAlign: 'center' }}>
        <p>{panel}</p>
      </div>
    </div>
  );
};

export default PanelInfo;