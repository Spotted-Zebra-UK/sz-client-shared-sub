import './Wave.scss';
import React, { FC } from 'react';

export interface IWave {
  id?: number;
  src: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  transform: string;
}

const Wave: FC<IWave> = props => {
  const { src, top, right, bottom, left, transform } = props;
  const waveStyle = {
    top,
    right,
    bottom,
    left,
    transform,
  };

  return <img src={src} alt="wave.svg" className="Wave" style={waveStyle} />;
};

export default Wave;
