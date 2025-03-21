type CVProps = {
};

export default function CV({ 
}: CVProps) {

  return (
    <>
      {/* Cone */}
      <mesh position={[0,0,-1]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshToonMaterial color="orange" />
      </mesh>
    </>
  );
}
