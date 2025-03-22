import { assets } from '../../../assets/assets'
import GLBModel from '../GLBModel';

type CVProps = {
  color?: string;
};

export default function CV({
  color
}: CVProps) {

  return (
    <>
      <GLBModel 
        url={assets.models.cv} 
        position={[0, -0.6, -1]} 
        scale={[0.6, 0.6, 0.6]}
        color={color}
      />
    </>
  );
}
