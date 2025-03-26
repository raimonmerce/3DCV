import React from 'react';

const Footer: React.FC= () => {
  return (
    <div 
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '15px',
        textAlign: 'center',
        opacity: 0.8,
      }}
    >
        Made by Raimon Mercé
    </div>
  );
};

export default Footer;