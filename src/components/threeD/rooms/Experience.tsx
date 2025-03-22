import { assets } from '../../../assets/assets'
import GLBModel from '../GLBModel';

type ExperienceProps = {
};

export default function Experience({ 
}: ExperienceProps) {

  return (
    <>
        <GLBModel url={assets.models.experience} position={[0, -0.6, -1]} scale={[0.6, 0.6, 0.6]}/>
    </>
  );
}
