import { IBubble } from './Bubbles/Bubble/Bubble';

interface IBubbleSet {
  readonly candidateReportMobile: IBubble[];
}

export const BubbleSets: IBubbleSet = {
  candidateReportMobile: [
    {
      id: 1,
      width: '36px',
      height: '36px',
      backgroundColor: '#00d3ad',
      top: '4px',
      left: '8px',
    },
    {
      id: 2,
      width: '10px',
      height: '10px',
      backgroundColor: '#10b7ff',
      top: '8px',
      right: '-22.5px',
    },
    {
      id: 3,
      width: '29px',
      height: '29px',
      backgroundColor: '#00d3ad',
      top: '17px',
      left: '-82px',
    },
    {
      id: 4,
      width: '46px',
      height: '46px',
      backgroundColor: '#10b7ff',
      top: '28px',
      left: '-66px',
    },
    {
      id: 5,
      width: '24px',
      height: '24px',
      backgroundColor: '#b75bff',
      top: '64px',
      right: '-38px',
    },
    {
      id: 6,
      width: '15px',
      height: '15px',
      backgroundColor: '#10b7ff',
      top: '65px',
      right: '-47.5px',
    },
    {
      id: 7,
      width: '40px',
      height: '40px',
      backgroundColor: '#00d3ad',
      top: '82px',
      right: '-79.5px',
    },
    {
      id: 8,
      width: '10px',
      height: '10px',
      backgroundColor: '#b75bff',
      top: '97px',
      left: '-58.5px',
    },
  ],
};
