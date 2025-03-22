import { assets } from '../../../assets/assets'
import GLBModel from '../GLBModel';

type AboutMeProps = {
  color?: string;
};

export default function AboutMe({ 
  color
}: AboutMeProps) {

  return (
    <>
      <GLBModel 
        url={assets.models.aboutme} 
        position={[0, -0.6, -1]} 
        scale={[0.6, 0.6, 0.6]}
        color={color}
      />
    </>
  );
}
