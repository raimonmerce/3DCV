type TopTextProps = {
  text: string;
};

export default function TopText ({ 
    text
}: TopTextProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '18px',
        color: 'white',
        textAlign: 'center',
        animation: 'blink 1.5s infinite alternate',
      }}
    >
      {text}
    </div>
  );
};

// const style = document.createElement('style');
// style.innerHTML = `
//   @keyframes blink {
//     0% {
//       opacity: 0;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
// `;
// document.head.appendChild(style);
