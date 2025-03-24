import RoomObject from '../RoomObject';
import {assets} from '../../../assets/assets'

type AboutMeProps = {

};

export default function AboutMe({ 

}: AboutMeProps) {

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
