import { waveSets } from "../static/WaveSets";

export const waveResolver = (set: number) => {
  switch (set) {
    case 1:
      return waveSets[1];

    case 2:
      return waveSets[2];

    case 3:
      return waveSets[3];

    case 4:
      return waveSets[4];

    case 5:
      return waveSets[5];

    case 6:
      return waveSets[6];

    case 7:
      return waveSets[7];

    default:
      return waveSets[8];
  }
};
