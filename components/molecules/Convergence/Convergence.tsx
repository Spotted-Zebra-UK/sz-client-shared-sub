import './Convergence.scss';
import React, { FC } from 'react';
import Waves from '../../../../../components/molecules/Waves/Waves';
import Gauge from '../../../../candidate/components/atoms/Gauge/Gauge';

interface IConvergence {
  totalScore: number;
  totalGrade: string;
  position: string;
  numberOfSoftSkills: number;
}

const Convergence: FC<IConvergence> = props => {
  const { totalScore, totalGrade, position, numberOfSoftSkills } = props;

  return (
    <div className="Convergence">
      <div className="Convergence__Content">
        <Gauge score={totalScore} grade={totalGrade} />
        <h5>{position}</h5>
      </div>

      <div className="Convergence__Waves">
        <Waves number={numberOfSoftSkills} />
      </div>
    </div>
  );
};

export default Convergence;
