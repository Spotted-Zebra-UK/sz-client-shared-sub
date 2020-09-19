import './SoftSkillOverviewPartial.scss';
import React, { FC } from 'react';
import Trait from '../../atoms/Trait/Trait';
import SoftSkill, { ISoftSkill } from '../../atoms/SoftSkill/SoftSkill';

interface ISoftSkillOverviewPartial {
  softSkill: ISoftSkill;
}

const SoftSkillOverviewPartial: FC<ISoftSkillOverviewPartial> = props => {
  const { softSkill } = props;

  return (
    <div className="SoftSkillOverviewPartial">
      <SoftSkill name={softSkill.name} />
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
  );
};

export default SoftSkillOverviewPartial;
