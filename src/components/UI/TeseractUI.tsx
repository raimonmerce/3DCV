import { ModeType } from '@/types/types';
import ButtonIcon from './components/ButtonIcon';
import {assets} from '../../assets/assets'
import TopText from "./components/TopText";

type TeseractUIProps = {
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

export default function TeseractUI({
  setMode
}: TeseractUIProps) {
  return (
    <>
        <ButtonIcon
            style={{
                position: 'absolute',
                top: '40px',
                right: '80px',
            }}
            svgPath={assets.svg.logo}
            onClick={() => setMode('OpenBox')}
        />
        <TopText text={'Double click a Portal to enter'}/>
    </>
  );
}
