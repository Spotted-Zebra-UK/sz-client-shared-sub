import React, { FC } from 'react';
import Wave from '../../atoms/Wave/Wave';
import { waveResolver } from '../../../helpers/waveResolver';

interface IWaves {
  number: number;
}

const Waves: FC<IWaves> = props => {
  const { number } = props;
  const setToRender = number < 8 ? waveResolver(number) : waveResolver(8);

  return (
    <>
      {setToRender.map(wave => {
        return (
          <Wave
            key={wave.id}
            src={wave.src}
            top={wave.top}
            right={wave.right}
            bottom={wave.bottom}
            left={wave.left}
            transform={wave.transform}
          />
        );
      })}
    </>
  );
};

export default Waves;
