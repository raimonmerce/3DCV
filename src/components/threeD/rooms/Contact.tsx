type ContactProps = {
};

export default function Contact({ 
}: ContactProps) {

  return (
    <>
        {/* Sphere */}
        <mesh position={[0,0,-1]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshToonMaterial color="blue" />
        </mesh>
    </>
  );
}
