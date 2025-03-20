type StudiesProps = {
};

export default function Studies({ 
}: StudiesProps) {

  return (
    <>
        {/* Plane */}
        <mesh position={[0,0,-1]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.5, 1.5]} />
            <meshToonMaterial color="gray" side={0} />
        </mesh>
    </>
  );
}
