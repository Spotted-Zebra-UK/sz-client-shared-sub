import './SoftSkillOverviewFull.scss';
import React, { FC } from 'react';
import Trait from '../../atoms/Trait/Trait';
import SoftSkillScore from '../../atoms/SoftSkillScore/SoftSkillScore';
import SoftSkill, { ISoftSkill } from '../../atoms/SoftSkill/SoftSkill';

interface ISoftSkillOverviewFull {
  softSkill: ISoftSkill;
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
          <p
            className="SoftSkillOverviewFull__SoftSkill__Details__Text"
            dangerouslySetInnerHTML={{ __html: `${softSkill.text}` }}
          />
        </div>
      </div>

      <div className="SoftSkillOverviewFull__Traits">
        {softSkill.traits?.map(trait => {
          return (
            <Trait
              key={trait.id}
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