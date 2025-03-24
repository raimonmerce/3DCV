import RoomObject from '../RoomObject';
import {assets} from '../../../assets/assets'

type AboutMeProps = {
  setPanel: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function AboutMe({ 
  setPanel
}: AboutMeProps) {

  return (
    <>
      <RoomObject
        name={'aboutme'}
        urlImage={assets.images.unionavatars}
        key="scene"
        color={'blue'}
        position={[-4, 0, -1]}
        scale={[1, 1, 1]}
        setPanel={setPanel}
      />,
    </>
  );
}
