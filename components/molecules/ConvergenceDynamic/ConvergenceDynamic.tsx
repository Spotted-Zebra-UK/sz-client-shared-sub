import React, { FC, ReactElement } from 'react';
import _ from 'lodash';
import { ReactComponent as WaveSImage } from '../../../icons/convergence/waveS-PDF.svg';
import { ReactComponent as WaveLImage } from '../../../icons/convergence/waveL-PDF.svg';
import { ReactComponent as WaveMImage } from '../../../icons/convergence/waveM-PDF.svg';
import { ReactComponent as WaveXXLImage } from '../../../icons/convergence/waveXXL-PDF.svg';
import './ConvergenceDynamic.scss';

interface IConvergenceDynamic {
  className?: string;
  numberOfWaves: number;
  renderCenter?: ReactElement;
  renderBoxesContent?: ReactElement[];
}

const ConvergenceDynamic: FC<IConvergenceDynamic> = ({
  className,
  numberOfWaves,
  renderCenter,
  renderBoxesContent,
}) => {
  const renderWavesRow = (numberOfWavesInRow: number, rowId: string) => {
    if (numberOfWavesInRow === 1) {
      return (
        <div className={`WavesRow WavesRow--Small WavesRow--${rowId}`}>
          <WaveSImage className="DynamicWave Wave--S" />
        </div>
      );
    }

    if (numberOfWavesInRow === 2) {
      return (
        <div className={`WavesRow WavesRow--Medium WavesRow--${rowId}`}>
          <WaveMImage className="DynamicWave Wave--M WavesRow--Medium__Wave--0" />
          <WaveMImage className="DynamicWave Wave--M WavesRow--Medium__Wave--1" />
        </div>
      );
    }

    if (numberOfWavesInRow === 3) {
      return (
        <div className={`WavesRow WavesRow--Large WavesRow--${rowId}`}>
          <WaveLImage className="DynamicWave Wave--L WavesRow--Large__Wave--0" />
          <WaveSImage className="DynamicWave Wave--S WavesRow--Large__Wave--1" />
          <WaveLImage className="DynamicWave Wave--L WavesRow--Large__Wave--2" />
        </div>
      );
    }

    if (numberOfWavesInRow === 4) {
      return (
        <div className={`WavesRow WavesRow--ExtraLarge WavesRow--${rowId}`}>
          <WaveXXLImage className="DynamicWave Wave--XXL WavesRow--ExtraLarge__Wave--0" />
          <WaveMImage className="DynamicWave Wave--M WavesRow--ExtraLarge__Wave--1" />
          <WaveMImage className="DynamicWave Wave--M WavesRow--ExtraLarge__Wave--2" />
          <WaveXXLImage className="DynamicWave Wave--XXL WavesRow--ExtraLarge__Wave--3" />
        </div>
      );
    }

    return null;
  };

  const renderBoxes = (
    numberOfBoxesInRow: number,
    rowId: string,
    renderBoxesRowContent: ReactElement[]
  ) => {
    return (
      <div className={`BoxesRow BoxesRow--${rowId}`}>
        {_.range(0, numberOfBoxesInRow).map(num => (
          <div
            className={`BoxesRow__Box BoxesRow__Box--${num}`}
            key={`box-${rowId}-${num}`}
          >
            {renderBoxesContent ? renderBoxesRowContent[num] : null}
          </div>
        ))}
      </div>
    );
  };

  const numberOfWavesLeft = Math.ceil(numberOfWaves / 2);
  const numberOfWavesRight = Math.floor(numberOfWaves / 2);

  const leftBoxesRowContent = renderBoxesContent?.slice(0, numberOfWavesLeft);
  const rightBoxesRowContent = renderBoxesContent?.slice(numberOfWavesLeft);

  return (
    <div className={`ConvergenceDynamic${className ? ` ${className}` : ''}`}>
      <div className="ConvergenceDynamic__LeftBoxes">
        {renderBoxes(numberOfWavesLeft, 'LeftRow', leftBoxesRowContent || [])}
      </div>
      <div className="ConvergenceDynamic__LeftWavesWrapper">
        {renderWavesRow(numberOfWavesLeft, 'Left')}
      </div>
      <div className="ConvergenceDynamic__Center">
        <div className="ConvergenceDynamic__Center__Content">
          {renderCenter || null}
        </div>
      </div>
      <div className="ConvergenceDynamic__RightWavesWrapper">
        {renderWavesRow(numberOfWavesRight, 'Right')}
      </div>
      <div className="ConvergenceDynamic__RightBoxes">
        {renderBoxes(
          numberOfWavesRight,
          'RightRow',
          rightBoxesRowContent || []
        )}
      </div>
    </div>
  );
};

export default ConvergenceDynamic;
