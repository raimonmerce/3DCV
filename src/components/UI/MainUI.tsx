import { ModeType, RoomType } from '@/types/types';

type MainUIProps = {
    mode: ModeType;
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
    room: RoomType | null;
    setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
};

// Reusable Button component with hover effects
const Button = ({ position, top = '40px', onClick, children }: { position: 'left' | 'right'; top?: string; onClick: () => void; children: React.ReactNode }) => (
    <a
        style={{
            position: 'absolute',
            top: top,
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

    function goToRoom( room : RoomType) {
        if (mode == "InitialBox") setMode('OpenBox')
        setRoom(room)
    }

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
            {(room || mode === 'Teseract') &&
                <Button position="left" onClick={() => setMode('OpenBox')}>
                    BACK
                </Button>
            }
            {mode === 'OpenBox' && !mode &&
                <Button position="left" onClick={() => setMode('InitialBox')}>
                    BACK
                </Button>
            } 

            <Button position="left" top={'240px'} onClick={() => goToRoom('Experience')}>
                EXPERIENCE
            </Button>
            <Button position="left" top={'280px'} onClick={() => goToRoom('Projects')}>
                PROJECTS
            </Button>
            <Button position="left" top={'320px'} onClick={() => goToRoom('Studies')}>
                STUDIES
            </Button>
            <Button position="left" top={'360px'} onClick={() => goToRoom('AboutMe')}>
                ABOUT ME
            </Button>
            <Button position="left" top={'400px'} onClick={() => goToRoom('CV')}>
                CV
            </Button>
            <Button position="left" top={'440px'} onClick={() => goToRoom('Contact')}>
                CONTACT
            </Button>
        </div>
    );
}
