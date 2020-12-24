import './Bubble.scss';
import React, { FC } from 'react';

export interface IBubble {}

const Bubble: FC<IBubble> = () => {
  return <div className="Bubble" />;
};

export default Bubble;
