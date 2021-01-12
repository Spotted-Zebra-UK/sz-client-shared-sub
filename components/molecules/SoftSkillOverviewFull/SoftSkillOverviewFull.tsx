import './SoftSkillOverviewFull.scss';
import React, { FC } from 'react';
import SoftSkill from '../../atoms/SoftSkill/SoftSkill';
import SoftSkillScore from '../../atoms/SoftSkillScore/SoftSkillScore';
import Trait from '../../atoms/Trait/Trait';

interface ISoftSkillOverviewFull {
  softSkill: {
    name: string;
    color?: string;
    grade?: string;
    text?: string;
    traits?: {
      name?: string;
      color: string;
      icon: string;
      bullet: string;
    }[];
  };
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
            dangerouslySetInnerHTML={{ __html: softSkill.text || '' }}
          />
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
