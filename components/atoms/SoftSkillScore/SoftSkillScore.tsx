import './SoftSkillScore.scss';
import React, { FC } from 'react';
import { colorResolver } from '../../../helpers/colorResolver';

interface ISoftSkillScore {
  color: string;
  grade: string;
}

const SoftSkillScore: FC<ISoftSkillScore> = props => {
  const { color, grade } = props;
  const border = {
    borderColor: colorResolver(color, 1),
  };

  return (
    <div className="SoftSkillScore" style={border}>
      <h4 className="AbsolutelyCentered">{grade}</h4>
    </div>
  );
};

export default SoftSkillScore;
