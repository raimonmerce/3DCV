import { useRoute, useLocation } from 'wouter'
import { ModeType } from '@/types/types';

type MainUIProps = {
    mode: ModeType;
    setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

export default function MainUI({ 
    mode, 
    setMode
  }: MainUIProps) {
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()
    return (
        <>
        <div
            style={{
                position: 'absolute',
                zIndex: 1,
                color: 'white',
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none'
            }}
        >
            <a 
                style={{ 
                    position: 'absolute', 
                    top: 40, 
                    left: 40, 
                    fontSize: '13px',
                    pointerEvents: 'auto', 
                }} 
                href="#" 
                onClick={() => setLocation('/')}
            >
                {params ? '< back' : 'double click to enter portal'}
            </a>
        </div>
        </>
    );
}
