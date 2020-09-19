import React, { FC } from 'react';
import Wave, { IWave } from '../../atoms/Wave/Wave';

interface IWaves {
  set: IWave[];
}

const Waves: FC<IWaves> = props => {
  const { set } = props;

  return (
    <>
      {set.map((wave: IWave) => {
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
