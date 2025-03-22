import { assets } from '../../../assets/assets'
import GLBModel from '../GLBModel';

type StudiesProps = {
};

export default function Studies({ 
}: StudiesProps) {

  return (
    <>
        <GLBModel url={assets.models.studies} position={[0, -0.6, -1]} scale={[0.6, 0.6, 0.6]}/>
    </>
  );
}
