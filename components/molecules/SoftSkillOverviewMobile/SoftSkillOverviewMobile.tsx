import './SoftSkillOverviewMobile.scss';
import React, { FC } from 'react';
import { TCandidateReportSoftSkill } from '../../../interfaces/candidateReport';
import SoftSkill from '../../atoms/SoftSkill/SoftSkill';
import SoftSkillScore from '../../atoms/SoftSkillScore/SoftSkillScore';
import Trait from '../../atoms/Trait/Trait';

interface ISoftSkillOverviewMobile {
  softSkill: TCandidateReportSoftSkill;
}

const SoftSkillOverviewMobile: FC<ISoftSkillOverviewMobile> = props => {
  const { softSkill } = props;

  return (
    <div className="SoftSkillOverviewMobile">
      <div className="SoftSkillOverviewMobile__Container">
        <div className="SoftSkillOverviewMobile__Container__SoftSkill">
          <SoftSkill name={softSkill.name} />
          <SoftSkillScore
            color={softSkill.color || ''}
            grade={softSkill.grade || ''}
          />
        </div>

        <div className="SoftSkillOverviewMobile__Container__Traits Top">
          {softSkill.traits
            ?.filter(trait => trait.color !== 'transparent')
            .map(trait => {
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

        <p
          className="SoftSkillOverviewMobile__Container__Text"
          dangerouslySetInnerHTML={{ __html: `${softSkill.text}` }}
        />

        <div className="SoftSkillOverviewMobile__Container__Traits Improve">
          {softSkill.traits
            ?.filter(trait => trait.color === 'transparent')
            .map(trait => {
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
    </div>
  );
};

export default SoftSkillOverviewMobile;
