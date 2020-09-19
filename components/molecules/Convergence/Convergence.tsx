import './Convergence.scss';
import React, { FC } from 'react';
import Gauge from '../../atoms/Gauge/Gauge';
import Waves from '../Waves/Waves';

interface IConvergence {
  totalScore: number;
  totalGrade: string;
  position: string;
  numberOfWaves: number;
}

const Convergence: FC<IConvergence> = props => {
  const { totalScore, totalGrade, position, numberOfWaves } = props;

  return (
    <div className="Convergence">
      <div className="Convergence__Content">
        <Gauge score={totalScore} grade={totalGrade} />
        <h5>{position}</h5>
      </div>

      <div className="Convergence__Waves">
        <Waves amount={numberOfWaves} />
      </div>
    </div>
  );
};

export default Convergence;
