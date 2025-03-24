import RoomObject from '../RoomObject';
import {assets} from '../../../assets/assets'

type StudiesProps = {
  setPanel: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function Studies({
  setPanel
}: StudiesProps) {

  return (
    <>
      <RoomObject
        name={'studies'}
        urlImage={assets.images.unionavatars}
        key="scene"
        color={'blue'}
        position={[-0.5, -1.5, -1]}
        scale={[1, 1, 1]}
        setPanel={setPanel}
      />,
    </>
  );
}
