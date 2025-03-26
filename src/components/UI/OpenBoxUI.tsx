import { ModeType } from '@/types/types';
import ButtonIcon from './components/ButtonIcon';
import {assets} from '../../assets/assets'
import TopText from "./components/TopText";

type OpenBoxUIProps = {
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

export default function OpenBoxUI({
  setMode
}: OpenBoxUIProps) {
  return (
    <>
        <ButtonIcon
            style={{
                position: 'absolute',
                top: '40px',
                right: '80px',
            }}
            svgPath={assets.svg.cube}
            onClick={() => setMode('Teseract')}
        />
        <TopText text={'Double click a Portal to enter'}/>
    </>
  );
}
