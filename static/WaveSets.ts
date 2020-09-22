import { IWave } from '../components/atoms/Wave/Wave';

interface ISet {
  readonly tablet: IWave[];
  readonly desktop: IWave[];
}

interface IWaveSet {
  readonly 1: ISet;
  readonly 2: ISet;
  readonly 3: ISet;
  readonly 4: ISet;
  readonly 5: ISet;
  readonly 6: ISet;
  readonly 7: ISet;
  readonly 8: ISet;
  readonly 9: ISet;
  readonly 10: ISet;
  readonly 11: ISet;
  readonly 12: ISet;
}

// -- Tablet
const tablet0Left = {
  id: 1,
  src: 'Convergence/waveS-Tablet.svg',
  top: '90px',
  left: '-101px',
  transform: 'scale(1, 1)',
};
const tablet0Right = {
  id: 2,
  src: 'Convergence/waveS-Tablet.svg',
  top: '90px',
  right: '-101px',
  transform: 'scale(-1, 1)',
};
const tablet15TopLeft = {
  id: 3,
  src: 'Convergence/waveM-Tablet.svg',
  top: '40px',
  left: '-101px',
  transform: 'scale(1, 1)',
};
const tablet15BottomLeft = {
  id: 4,
  src: 'Convergence/waveM-Tablet.svg',
  bottom: '40px',
  left: '-101px',
  transform: 'scale(1, -1)',
};
const tablet15TopRight = {
  id: 5,
  src: 'Convergence/waveM-Tablet.svg',
  top: '40px',
  right: '-101px',
  transform: 'scale(-1, 1)',
};
const tablet15BottomRight = {
  id: 6,
  src: 'Convergence/waveM-Tablet.svg',
  bottom: '40px',
  right: '-101px',
  transform: 'scale(-1, -1)',
};
const tablet30TopLeft = {
  id: 7,
  src: 'Convergence/waveL-Tablet.svg',
  top: '-10px',
  left: '-101px',
  transform: 'scale(1, 1)',
};
const tablet30BottomLeft = {
  id: 8,
  src: 'Convergence/waveL-Tablet.svg',
  bottom: '-10px',
  left: '-101px',
  transform: 'scale(1, -1)',
};
const tablet30TopRight = {
  id: 9,
  src: 'Convergence/waveL-Tablet.svg',
  top: '-10px',
  right: '-101px',
  transform: 'scale(-1, 1)',
};
const tablet30BottomRight = {
  id: 10,
  src: 'Convergence/waveL-Tablet.svg',
  bottom: '-10px',
  right: '-101px',
  transform: 'scale(-1, -1)',
};
const tablet45TopLeft = {
  id: 11,
  src: 'Convergence/waveXL-Tablet.svg',
  top: '-60px',
  left: '-101px',
  transform: 'scale(1, 1)',
};
const tablet45BottomLeft = {
  id: 12,
  src: 'Convergence/waveXL-Tablet.svg',
  bottom: '-60px',
  left: '-101px',
  transform: 'scale(1, -1)',
};
const tablet45TopRight = {
  id: 13,
  src: 'Convergence/waveXL-Tablet.svg',
  top: '-60px',
  right: '-101px',
  transform: 'scale(-1, 1)',
};
const tablet45BottomRight = {
  id: 14,
  src: 'Convergence/waveXL-Tablet.svg',
  bottom: '-60px',
  right: '-101px',
  transform: 'scale(-1, -1)',
};
const tablet60TopLeft = {
  id: 15,
  src: 'Convergence/waveXXL-Tablet.svg',
  top: '-110px',
  left: '-101px',
  transform: 'scale(1, 1)',
};
const tablet60BottomLeft = {
  id: 16,
  src: 'Convergence/waveXXL-Tablet.svg',
  bottom: '-110px',
  left: '-101px',
  transform: 'scale(1, -1)',
};
const tablet60TopRight = {
  id: 17,
  src: 'Convergence/waveXXL-Tablet.svg',
  top: '-110px',
  right: '-101px',
  transform: 'scale(-1, 1)',
};
const tablet60BottomRight = {
  id: 18,
  src: 'Convergence/waveXXL-Tablet.svg',
  bottom: '-110px',
  right: '-101px',
  transform: 'scale(-1, -1)',
};
const tablet75TopLeft = {
  id: 19,
  src: 'Convergence/waveXXXL-Tablet.svg',
  top: '-160px',
  left: '-102px',
  transform: 'scale(1, 1)',
};
const tablet75BottomLeft = {
  id: 20,
  src: 'Convergence/waveXXXL-Tablet.svg',
  bottom: '-160px',
  left: '-102px',
  transform: 'scale(1, -1)',
};
const tablet75TopRight = {
  id: 21,
  src: 'Convergence/waveXXXL-Tablet.svg',
  top: '-160px',
  right: '-102px',
  transform: 'scale(-1, 1)',
};
const tablet75BottomRight = {
  id: 22,
  src: 'Convergence/waveXXXL-Tablet.svg',
  bottom: '-160px',
  right: '-102px',
  transform: 'scale(-1, -1)',
};

// -- Desktop
const desktop0Left = {
  id: 23,
  src: 'Convergence/waveS-Desktop.svg',
  top: '90px',
  left: '-205px',
  transform: 'scale(1, 1)',
};
const desktop0Right = {
  id: 24,
  src: 'Convergence/waveS-Desktop.svg',
  top: '90px',
  right: '-205px',
  transform: 'scale(-1, -1)',
};
const desktop15TopLeft = {
  id: 25,
  src: 'Convergence/waveM-Desktop.svg',
  top: '40px',
  left: '-205px',
  transform: 'scale(1, 1)',
};
const desktop15BottomLeft = {
  id: 26,
  src: 'Convergence/waveM-Desktop.svg',
  bottom: '40px',
  left: '-205px',
  transform: 'scale(1, -1)',
};
const desktop15TopRight = {
  id: 27,
  src: 'Convergence/waveM-Desktop.svg',
  top: '40px',
  right: '-205px',
  transform: 'scale(-1, 1)',
};
const desktop15BottomRight = {
  id: 28,
  src: 'Convergence/waveM-Desktop.svg',
  bottom: '40px',
  right: '-205px',
  transform: 'scale(-1, -1)',
};
const desktop30TopLeft = {
  id: 29,
  src: 'Convergence/waveL-Desktop.svg',
  top: '-10px',
  left: '-205px',
  transform: 'scale(1, 1)',
};
const desktop30BottomLeft = {
  id: 30,
  src: 'Convergence/waveL-Desktop.svg',
  bottom: '-10px',
  left: '-205px',
  transform: 'scale(1, -1)',
};
const desktop30TopRight = {
  id: 31,
  src: 'Convergence/waveL-Desktop.svg',
  top: '-10px',
  right: '-205px',
  transform: 'scale(-1, 1)',
};
const desktop30BottomRight = {
  id: 32,
  src: 'Convergence/waveL-Desktop.svg',
  bottom: '-10px',
  right: '-205px',
  transform: 'scale(-1, -1)',
};
const desktop45TopLeft = {
  id: 33,
  src: 'Convergence/waveXL-Desktop.svg',
  top: '-60px',
  left: '-205px',
  transform: 'scale(1, 1)',
};
const desktop45BottomLeft = {
  id: 34,
  src: 'Convergence/waveXL-Desktop.svg',
  bottom: '-60px',
  left: '-205px',
  transform: 'scale(1, -1)',
};
const desktop45TopRight = {
  id: 35,
  src: 'Convergence/waveXL-Desktop.svg',
  top: '-60px',
  right: '-205px',
  transform: 'scale(-1, 1)',
};
const desktop45BottomRight = {
  id: 36,
  src: 'Convergence/waveXL-Desktop.svg',
  bottom: '-60px',
  right: '-205px',
  transform: 'scale(-1, -1)',
};
const desktop60TopLeft = {
  id: 37,
  src: 'Convergence/waveXXL-Desktop.svg',
  top: '-110px',
  left: '-205px',
  transform: 'scale(1, 1)',
};
const desktop60BottomLeft = {
  id: 38,
  src: 'Convergence/waveXXL-Desktop.svg',
  bottom: '-110px',
  left: '-205px',
  transform: 'scale(1, -1)',
};
const desktop60TopRight = {
  id: 39,
  src: 'Convergence/waveXXL-Desktop.svg',
  top: '-110px',
  right: '-205px',
  transform: 'scale(-1, 1)',
};
const desktop60BottomRight = {
  id: 40,
  src: 'Convergence/waveXXL-Desktop.svg',
  bottom: '-110px',
  right: '-205px',
  transform: 'scale(-1, -1)',
};
const desktop75TopLeft = {
  id: 41,
  src: 'Convergence/waveXXXL-Desktop.svg',
  top: '-155px',
  left: '-205px',
  transform: 'scale(1, 1)',
};
const desktop75BottomLeft = {
  id: 42,
  src: 'Convergence/waveXXXL-Desktop.svg',
  bottom: '-155px',
  left: '-205px',
  transform: 'scale(1, -1)',
};
const desktop75TopRight = {
  id: 43,
  src: 'Convergence/waveXXXL-Desktop.svg',
  top: '-155px',
  right: '-205px',
  transform: 'scale(-1, 1)',
};
const desktop75BottomRight = {
  id: 44,
  src: 'Convergence/waveXXXL-Desktop.svg',
  bottom: '-155px',
  right: '-205px',
  transform: 'scale(-1, -1)',
};

export const waveSets: IWaveSet = {
  1: {
    tablet: [tablet0Left],
    desktop: [desktop0Left],
  },
  2: {
    tablet: [tablet0Left, tablet0Right],
    desktop: [desktop0Left, desktop0Right],
  },
  3: {
    tablet: [tablet15TopLeft, tablet15BottomLeft, tablet0Right],
    desktop: [desktop15TopLeft, desktop15BottomLeft, desktop0Right],
  },
  4: {
    tablet: [
      tablet15TopLeft,
      tablet15BottomLeft,
      tablet15TopRight,
      tablet15BottomRight,
    ],
    desktop: [
      desktop15TopLeft,
      desktop15BottomLeft,
      desktop15TopRight,
      desktop15BottomRight,
    ],
  },
  5: {
    tablet: [
      tablet30TopLeft,
      tablet0Left,
      tablet30BottomLeft,
      tablet15TopRight,
      tablet15BottomRight,
    ],
    desktop: [
      desktop30TopLeft,
      desktop0Left,
      desktop30BottomLeft,
      desktop15TopRight,
      desktop15BottomRight,
    ],
  },
  6: {
    tablet: [
      tablet30TopLeft,
      tablet0Left,
      tablet30BottomLeft,
      tablet30TopRight,
      tablet0Right,
      tablet30BottomRight,
    ],
    desktop: [
      desktop30TopLeft,
      desktop0Left,
      desktop30BottomLeft,
      desktop30TopRight,
      desktop0Right,
      desktop30BottomRight,
    ],
  },
  7: {
    tablet: [
      tablet45TopLeft,
      tablet15TopLeft,
      tablet15BottomLeft,
      tablet45BottomLeft,
      tablet30TopRight,
      tablet0Right,
      tablet30BottomRight,
    ],
    desktop: [
      desktop45TopLeft,
      desktop15TopLeft,
      desktop15BottomLeft,
      desktop45BottomLeft,
      desktop30TopRight,
      desktop0Right,
      desktop30BottomRight,
    ],
  },
  8: {
    tablet: [
      tablet45TopLeft,
      tablet15TopLeft,
      tablet15BottomLeft,
      tablet45BottomLeft,
      tablet45TopRight,
      tablet15TopRight,
      tablet15BottomRight,
      tablet45BottomRight,
    ],
    desktop: [
      desktop45TopLeft,
      desktop15TopLeft,
      desktop15BottomLeft,
      desktop45BottomLeft,
      desktop45TopRight,
      desktop15TopRight,
      desktop15BottomRight,
      desktop45BottomRight,
    ],
  },
  9: {
    tablet: [
      tablet60TopLeft,
      tablet30TopLeft,
      tablet0Left,
      tablet30BottomLeft,
      tablet60BottomLeft,
      tablet45TopRight,
      tablet15TopRight,
      tablet15BottomRight,
      tablet45BottomRight,
    ],
    desktop: [
      desktop60TopLeft,
      desktop30TopLeft,
      desktop0Left,
      desktop30BottomLeft,
      desktop60BottomLeft,
      desktop45TopRight,
      desktop15TopRight,
      desktop15BottomRight,
      desktop45BottomRight,
    ],
  },
  10: {
    tablet: [
      tablet60TopLeft,
      tablet30TopLeft,
      tablet0Left,
      tablet30BottomLeft,
      tablet60BottomLeft,
      tablet60TopRight,
      tablet30TopRight,
      tablet0Right,
      tablet30BottomRight,
      tablet60BottomRight,
    ],
    desktop: [
      desktop60TopLeft,
      desktop30TopLeft,
      desktop0Left,
      desktop30BottomLeft,
      desktop60BottomLeft,
      desktop60TopRight,
      desktop30TopRight,
      desktop0Right,
      desktop30BottomRight,
      desktop60BottomRight,
    ],
  },
  11: {
    tablet: [
      tablet75TopLeft,
      tablet45TopLeft,
      tablet15TopLeft,
      tablet15BottomLeft,
      tablet45BottomLeft,
      tablet75BottomLeft,
      tablet60TopRight,
      tablet30TopRight,
      tablet0Right,
      tablet30BottomRight,
      tablet60BottomRight,
    ],
    desktop: [
      desktop75TopLeft,
      desktop45TopLeft,
      desktop15TopLeft,
      desktop15BottomLeft,
      desktop45BottomLeft,
      desktop75BottomLeft,
      desktop60TopRight,
      desktop30TopRight,
      desktop0Right,
      desktop30BottomRight,
      desktop60BottomRight,
    ],
  },
  12: {
    tablet: [
      tablet75TopLeft,
      tablet45TopLeft,
      tablet15TopLeft,
      tablet15BottomLeft,
      tablet45BottomLeft,
      tablet75BottomLeft,
      tablet75TopRight,
      tablet45TopRight,
      tablet15TopRight,
      tablet15BottomRight,
      tablet45BottomRight,
      tablet75BottomRight,
    ],
    desktop: [
      desktop75TopLeft,
      desktop45TopLeft,
      desktop15TopLeft,
      desktop15BottomLeft,
      desktop45BottomLeft,
      desktop75BottomLeft,
      desktop75TopRight,
      desktop45TopRight,
      desktop15TopRight,
      desktop15BottomRight,
      desktop45BottomRight,
      desktop75BottomRight,
    ],
  },
};
