type ExperienceProps = {
};

export default function Experience({ 
}: ExperienceProps) {

  return (
    <>
        {/* Torus */}
        <mesh position={[0,0,-1]}>
            <torusGeometry args={[0.6, 0.2, 16, 100]} />
            <meshToonMaterial color="purple" />
        </mesh>
    </>
  );
}
