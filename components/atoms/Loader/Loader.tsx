import './Loader.scss';
import React, { FC } from 'react';

interface ILoader {
  isOverlay?: boolean;
  color?: 'Primary' | 'Secondary' | 'Tertiary';
}

const Loader: FC<ILoader> = ({ isOverlay, color = 'Primary' }) => {
  const className = `Loader Loader--${color}${
    isOverlay ? ' Loader--Overlay' : ''
  }`;

  return (
    <div className={className}>
      <div className="Loader__Animation">
        <div className="Loader__Bounce__1" />
        <div className="Loader__Bounce__2" />
        <div className="Loader__Bounce__3" />
      </div>
    </div>
  );
};

export default Loader;
