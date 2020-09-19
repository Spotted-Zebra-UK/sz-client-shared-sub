import React, { FC } from 'react';
import Wave, { IWave } from '../../atoms/Wave/Wave';
import { waveResolver } from '../../../helpers/waveResolver';

interface IWaves {
  amount: number;
}

const Waves: FC<IWaves> = props => {
  const { amount } = props;
  const setToRender = waveResolver(amount);

  return (
    <>
      {setToRender.map((wave: IWave) => {
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
