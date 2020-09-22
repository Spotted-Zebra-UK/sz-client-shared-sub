import './Convergence.scss';
import React, { FC } from 'react';
import { waveResolver } from '../../../helpers/waveResolver';
import Gauge from '../../atoms/Gauge/Gauge';
import Waves from '../Waves/Waves';

interface IConvergence {
  totalScore: number;
  totalGrade: string;
  numberOfWaves: number;
}

const Convergence: FC<IConvergence> = props => {
  const { totalScore, totalGrade, numberOfWaves } = props;
  const setToRender = waveResolver(numberOfWaves);

  return (
    <div className="Convergence">
      <div className="Convergence__Content">
        <Gauge score={totalScore} grade={totalGrade} />
      </div>

      <div className="Convergence__Waves">
        <>
          <div className="Convergence__Waves__Tablet">
            <Waves set={setToRender.tablet} />
          </div>

          <div className="Convergence__Waves__Desktop">
            <Waves set={setToRender.desktop} />
          </div>
        </>
      </div>
    </div>
  );
};

export default Convergence;
