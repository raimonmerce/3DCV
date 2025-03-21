import { ModeType, RoomType } from '@/types/types';

type MainUIProps = {
    mode: ModeType;
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
    room: RoomType | null;
    setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

// Reusable Button component with hover effects
const Button = ({ position, onClick, children }: { position: 'left' | 'right'; onClick: () => void; children: React.ReactNode }) => (
    <a
        style={{
            position: 'absolute',
            top: 40,
            [position]: 40,
            fontSize: '20px',
            pointerEvents: 'auto',
            cursor: 'pointer',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            color: 'white',
            transition: 'color 0.2s ease',
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
            e.currentTarget.style.color = 'gray';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.color = 'white';
        }}
    >
        {children}
    </a>
);

export default function MainUI({ mode, setMode, room, setRoom }: MainUIProps) {
    const isInitialOrOpenBox = mode !== 'InitialBox' && mode !== 'OpenBox' && mode !== 'Teseract';

    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 1,
                color: 'white',
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
            }}
        >
            {room ? (
                <Button position="left" onClick={() => setRoom(null)}>
                    BACK
                </Button>
            ) : (
                <>
                    {mode === 'OpenBox' && (
                        <>
                            <Button position="left" onClick={() => setMode('InitialBox')}>
                                BACK
                            </Button>
                            <Button position="right" onClick={() => setMode('Teseract')}>
                                FOLD
                            </Button>
                        </>
                    )}
                    {mode === 'Teseract' && (
                        <Button position="left" onClick={() => setMode('OpenBox')}>
                            BACK
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}
