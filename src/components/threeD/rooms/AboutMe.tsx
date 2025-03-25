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
        position={[-2, 0, -1]}
        scale={[0.5, 0.5, 0.5]}
        setPanel={setPanel}
      />,
    </>
  );
}
