import RoomObject from '../RoomObject';
import {assets} from '../../../assets/assets'

type AboutMeProps = {

};

export default function AboutMe({ 

}: AboutMeProps) {

  return (
    <>
      <RoomObject
        url={assets.models.studies}
        key="scene"
        urlLink={'https://x.com/chemaalonso'}
        nameLink={'X'}
        position={[-2, -0.5, -1]}
        scale={[0.5, 0.5, 0.5]}
      />,
    </>
  );
}
