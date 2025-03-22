import { assets } from '../../../assets/assets'
import GLBModel from '../GLBModel';

type ProjectsProps = {
  color?: string;
};

export default function Projects({
  color
}: ProjectsProps) {

  return (
    <>
      <GLBModel 
        url={assets.models.projects} 
        position={[0, -0.6, -1]} 
        scale={[0.6, 0.6, 0.6]}
        color={color}
      />
    </>
  );
}
