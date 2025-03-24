import { Billboard, Html } from '@react-three/drei';

type BillboardHtmlProps = {
    center: { x: number; y: number; z: number };
    offsetPoint: [number, number, number];
    opacity: number;
    isHovered: boolean;
    nameLink: string;
    handleClick: () => void;
    handleTextOver: () => void;
    handleTextOut: () => void;
};

export default function BillboardHtml({
    center,
    offsetPoint,
    opacity,
    isHovered,
    // nameLink,
    // handleClick,
    // handleTextOver,
    // handleTextOut,
}: BillboardHtmlProps) {

    return (
        <Billboard
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false}
            position={[
                center.x + offsetPoint[0],
                center.y + offsetPoint[1],
                center.z + offsetPoint[2]
            ]}
            renderOrder={999}
        >
        {opacity > 0 && (
            <Html>
                <div>AAAA</div>
            </Html>
        )}
        {!isHovered && opacity === 0 && (
            <Html>
            <div
                style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translate(-50%, -10px)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
                    animation: 'primaryPulse 1.5s infinite',
                    pointerEvents: 'auto'
                }}
            />
            <div
                style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translate(-50%, -10px)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
                    animation: 'secondaryPulse 4s infinite',
                    pointerEvents: 'none'
                }}
            />
            </Html>
        )}
        </Billboard>
    );
}