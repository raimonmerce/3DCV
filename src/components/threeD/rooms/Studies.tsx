import RoomObject from '../RoomObject';
import {assets} from '../../../assets/assets'

type StudiesProps = {
};

export default function Studies({
}: StudiesProps) {

  return (
    <>
      <RoomObject
        urlImage={assets.images.unionavatars}
        key="scene"
        color={'blue'}
        position={[-0.5, -1.5, -1]}
        scale={[1, 1, 1]}
      />,
    </>
  );
}
