import './Gauge.scss';
import 'react-circular-progressbar/dist/styles.css';
import React, { FC } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

interface IGauge {
  score: number;
  grade?: string;
}

const Gauge: FC<IGauge> = props => {
  const { score, grade } = props;

  return (
    <div className="Gauge">
      <CircularProgressbar
        value={score}
        circleRatio={0.75}
        strokeWidth={3}
        styles={buildStyles({
          rotation: 1 / 2 + 1 / 8,
          pathColor: 'lightblue',
          trailColor: '#eeeeee',
        })}
      />
      <h2 className="Gauge__Score AbsolutelyCentered">{grade}</h2>
    </div>
  );
};

export default Gauge;
