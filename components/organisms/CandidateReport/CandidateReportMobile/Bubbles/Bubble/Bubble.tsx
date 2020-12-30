import './Bubble.scss';
import React, { FC } from 'react';

export interface IBubble {
  id?: number;
  width: string;
  height: string;
  backgroundColor: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

const Bubble: FC<IBubble> = props => {
  const { width, height, backgroundColor, top, right, bottom, left } = props;
  const circleStyle = {
    width,
    height,
    backgroundColor,
    top,
    right,
    bottom,
    left,
  };

  return <div className="Bubble" style={circleStyle} />;
};

export default Bubble;
