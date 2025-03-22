import { assets } from '../../../assets/assets'
import GLBModel from '../GLBModel';

type ExperienceProps = {
  color?: string;
};

export default function Experience({
  color
}: ExperienceProps) {

  return (
    <>
      <GLBModel 
        url={assets.models.experience} 
        position={[0, -0.6, -1]} 
        scale={[0.6, 0.6, 0.6]}
        color={color}
      />
    </>
  );
}
