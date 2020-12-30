import './SoftSkillCard.scss';
import React, { FC } from 'react';
import { colorResolver } from '../../../helpers/colorResolver';
import { TCandidateReportSoftSkill } from '../../../interfaces/candidateReport';

interface ISoftSkillCard {
  softSkill: TCandidateReportSoftSkill;
}

const SoftSkillCard: FC<ISoftSkillCard> = props => {
  const { softSkill } = props;
  const progressBar = {
    width: softSkill.score ? `${softSkill.score}%` : 0,
    backgroundColor: colorResolver(softSkill.color || '', 1),
    opacity: 1,
  };

  return (
    <div className="SoftSkillCard">
      <div className="SoftSkillCard__Text">
        <h4 className="SoftSkillCard__Text__Name">{softSkill.name}</h4>
        <h4 className="SoftSkillCard__Text__Score">{softSkill.grade}</h4>
      </div>

      <div className="SoftSkillCard__Progress">
        <div className="SoftSkillCard__Progress__Bar" style={progressBar} />
      </div>
    </div>
  );
};

export default SoftSkillCard;
