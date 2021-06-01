import './Bubble.scss';
import React, { FC } from 'react';

export interface IBubble {
  className?: string;
}

const Bubble: FC<IBubble> = ({ className }) => {
  return <div className={`Bubble${className ? ` ${className}` : ''}`} />;
};

export default Bubble;
