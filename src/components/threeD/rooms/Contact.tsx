import { assets } from '../../../assets/assets'
import GLBModel from '../GLBModel';

type ContactProps = {
  color?: string;
};

export default function Contact({ 
  color
}: ContactProps) {

  return (
    <>
      <GLBModel 
        url={assets.models.contact} 
        position={[0, -0.6, -1]} 
        scale={[0.6, 0.6, 0.6]}
        color={color}
      />
    </>
  );
}
