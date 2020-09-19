import { IWave } from "../components/atoms/Wave/Wave";

interface IWaveSet {
  readonly 1: IWave[];
  readonly 2: IWave[];
  readonly 3: IWave[];
  readonly 4: IWave[];
  readonly 5: IWave[];
  readonly 6: IWave[];
  readonly 7: IWave[];
  readonly 8: IWave[];
}

const left0 = {
  id: 1,
  src: 'Convergence/WaveS-PDF.svg',
  top: '130px',
  left: '-71px',
  transform: 'scale(1, 1)',
};
const right0 = {
  id: 2,
  src: 'Convergence/WaveS-PDF.svg',
  top: '130px',
  right: '-71px',
  transform: 'scale(-1, 1)',
};
const topLeft15 = {
  id: 3,
  src: 'Convergence/WaveM-PDF.svg',
  top: '80px',
  left: '-71px',
  transform: 'scale(1, 1)',
};
const bottomLeft15 = {
  id: 4,
  src: 'Convergence/WaveM-PDF.svg',
  bottom: '80px',
  left: '-71px',
  transform: 'scale(1, -1)',
};
const topRight15 = {
  id: 5,
  src: 'Convergence/WaveM-PDF.svg',
  top: '80px',
  right: '-71px',
  transform: 'scale(-1, 1)',
};
const bottomRight15 = {
  id: 6,
  src: 'Convergence/WaveM-PDF.svg',
  bottom: '80px',
  right: '-71px',
  transform: 'scale(-1, -1)',
};
const topLeft30 = {
  id: 7,
  src: 'Convergence/WaveL-PDF.svg',
  top: '30px',
  left: '-73px',
  transform: 'scale(1, 1)',
};
const bottomLeft30 = {
  id: 8,
  src: 'Convergence/WaveL-PDF.svg',
  bottom: '30px',
  left: '-73px',
  transform: 'scale(1, -1)',
};
const topRight30 = {
  id: 9,
  src: 'Convergence/WaveL-PDF.svg',
  top: '30px',
  right: '-73px',
  transform: 'scale(-1, 1)',
};
const bottomRight30 = {
  id: 10,
  src: 'Convergence/WaveL-PDF.svg',
  bottom: '30px',
  right: '-73px',
  transform: 'scale(-1, -1)',
};
const topLeft45 = {
  id: 11,
  src: 'Convergence/WaveXL-PDF.svg',
  top: '-20px',
  left: '-74px',
  transform: 'scale(1, 1)',
};
const bottomLeft45 = {
  id: 12,
  src: 'Convergence/WaveXL-PDF.svg',
  bottom: '-20px',
  left: '-74px',
  transform: 'scale(1, -1)',
};
const topRight45 = {
  id: 13,
  src: 'Convergence/WaveXL-PDF.svg',
  top: '-20px',
  right: '-74px',
  transform: 'scale(-1, 1)',
};
const bottomRight45 = {
  id: 14,
  src: 'Convergence/WaveXL-PDF.svg',
  bottom: '-20px',
  right: '-74px',
  transform: 'scale(-1, -1)',
};

export const waveSets: IWaveSet = {
  1: [left0],
  2: [left0, right0],
  3: [topLeft15, bottomLeft15, right0],
  4: [topLeft15, bottomLeft15, topRight15, bottomRight15],
  5: [topLeft30, left0, bottomLeft30, topRight15, bottomRight15],
  6: [topLeft30, left0, bottomLeft30, topRight30, right0, bottomRight30],
  7: [topLeft45, topLeft15, bottomLeft15, bottomLeft45, topRight30, right0, bottomRight30],
  8: [topLeft45, topLeft15, bottomLeft15, bottomLeft45, topRight45, topRight15, bottomRight15, bottomRight45],
};
