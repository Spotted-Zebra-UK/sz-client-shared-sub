import './SoftSkillOverviewFull.scss';
import React, { FC } from 'react';
import { TCandidateReportSoftSkill } from '../../../interfaces/candidateReport';
import SoftSkill from '../../atoms/SoftSkill/SoftSkill';
import SoftSkillScore from '../../atoms/SoftSkillScore/SoftSkillScore';
import Trait from '../../atoms/Trait/Trait';

interface ISoftSkillOverviewFull {
  softSkill: TCandidateReportSoftSkill;
}

const SoftSkillOverviewFull: FC<ISoftSkillOverviewFull> = props => {
  const { softSkill } = props;

  return (
    <div className="SoftSkillOverviewFull">
      <div className="SoftSkillOverviewFull__SoftSkill">
        <SoftSkill name={softSkill.name} />

        <div className="SoftSkillOverviewFull__SoftSkill__Details">
          <SoftSkillScore
            color={softSkill.color || ''}
            grade={softSkill.grade || ''}
          />
          <p className="SoftSkillOverviewFull__SoftSkill__Details__Text">
            `${softSkill.text}`
          </p>
        </div>
      </div>

      <div className="SoftSkillOverviewFull__Traits">
        {softSkill.traits?.map(trait => {
          return (
            <Trait
              key={trait.name}
              color={trait.color}
              icon={trait.icon}
              bullet={trait.bullet}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SoftSkillOverviewFull;
