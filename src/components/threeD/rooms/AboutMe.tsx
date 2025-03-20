type AboutMeProps = {
};

export default function AboutMe({ 
}: AboutMeProps) {

  return (
    <>
      <mesh position={[0,0,-1]} >
        <coneGeometry args={[0.7, 1.5, 16]} />
        <meshToonMaterial color="red" />
      </mesh>
    </>
  );
}
