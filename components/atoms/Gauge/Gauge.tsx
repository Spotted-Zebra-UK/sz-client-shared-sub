import './Gauge.scss';
import 'react-circular-progressbar/dist/styles.css';
import React, { FC } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

interface IGauge {
  score?: number;
  grade?: string;
}

const Gauge: FC<IGauge> = ({ score, grade }) => {
  const styles = buildStyles({
    rotation: 1 / 2 + 1 / 8,
    strokeLinecap: 'butt',
    trailColor: '#eee',
    textSize: 40,
    textColor: 'black',
  });
  return (
    <div className="Gauge">
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient id="sz-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#b75bff" />
            <stop offset="50%" stopColor="#10b7ff" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgressbar
        value={score || 0}
        text={`${grade}`}
        circleRatio={0.75}
        strokeWidth={4}
        styles={styles}
      />
    </div>
  );
};

export default Gauge;
