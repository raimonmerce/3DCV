import { ModeType } from '@/types/types';
import ButtonIcon from './components/ButtonIcon';
import {assets} from '../../assets/assets'

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
                right: 40,
            }}
            svgPath={assets.svg.cube}
            onClick={() => setMode('Teseract')}
        />
    </>
  );
}
