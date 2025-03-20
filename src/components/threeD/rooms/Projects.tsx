type ProjectsProps = {
};

export default function Projects({ 
}: ProjectsProps) {

  return (
    <>
        {/* Cylinder */}
        <mesh position={[0,0,-1]}>
            <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
            <meshToonMaterial color="green" />
        </mesh>
    </>
  );
}
