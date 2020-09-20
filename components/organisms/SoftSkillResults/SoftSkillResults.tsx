import './SoftSkillResults.scss';
import React, { FC } from 'react';
import { ISoftSkill } from '../../atoms/SoftSkill/SoftSkill';
import SoftSkillOverviewPartial from '../../molecules/SoftSkillOverviewPartial/SoftSkillOverviewPartial';

interface ISoftSkillResults {
  heading: string;
  caption: string;
  softSkills: ISoftSkill[];
}

const SoftSkillResults: FC<ISoftSkillResults> = props => {
  const { heading, caption, softSkills } = props;

  return (
    <div className="SoftSkillResults">
      <h4 className="SoftSkillResults__Heading">{heading}</h4>
      <h6 className="SoftSkillResults__Caption">{caption}</h6>

      <div className="SoftSkillResults__List">
        {softSkills.map((softSkill: ISoftSkill) => {
          return (
            <SoftSkillOverviewPartial
              key={softSkill.id}
              softSkill={softSkill}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SoftSkillResults;
