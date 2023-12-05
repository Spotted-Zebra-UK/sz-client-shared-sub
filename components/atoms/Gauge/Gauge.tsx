import './Gauge.scss';
import 'react-circular-progressbar/dist/styles.css';
import React, { FC } from 'react';
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

interface IGauge {
  score?: number;
  grade?: string;
  pathColor?: string;
  showGradientPath?: boolean;
  className?: string;
  childCircularComponent?: JSX.Element;
  showScore?: boolean;
  centerTextColor?: string;
}

const Gauge: FC<IGauge> = ({
  score,
  grade,
  pathColor,
  showGradientPath = true,
  className,
  childCircularComponent,
  showScore,
  centerTextColor,
}) => {
  const styles = buildStyles({
    rotation: 1 / 2 + 1 / 8,
    strokeLinecap: 'butt',
    trailColor: '#eee',
    textSize: 40,
    textColor: centerTextColor || 'black',
    pathColor,
  });
  return (
    <div
      className={`Gauge${showGradientPath ? ' Gauge--Gradient' : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      {showGradientPath ? (
        <svg style={{ height: 0, width: 0 }}>
          <defs>
            <linearGradient id="sz-gradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#b75bff" />
              <stop offset="50%" stopColor="#10b7ff" />
            </linearGradient>
          </defs>
        </svg>
      ) : null}
      {childCircularComponent ? (
        <CircularProgressbarWithChildren
          value={score || 0}
          circleRatio={0.75}
          strokeWidth={4}
          styles={styles}
        >
          {childCircularComponent}
        </CircularProgressbarWithChildren>
      ) : (
        <CircularProgressbar
          value={score || 0}
          text={showScore ? score?.toString() : grade}
          circleRatio={0.75}
          strokeWidth={4}
          styles={styles}
        >
          {childCircularComponent}
        </CircularProgressbar>
      )}
    </div>
  );
};

export default Gauge;
