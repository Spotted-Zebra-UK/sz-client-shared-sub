import './SoftSkillSynergy.scss';
import React, { FC } from 'react';
import Convergence from '../../molecules/Convergence/Convergence';
import { ISoftSkill } from '../../atoms/SoftSkill/SoftSkill';
import SoftSkillCard from '../../atoms/SoftSkillCard/SoftSkillCard';

interface ISoftSkillSynergy {
  softSkills: ISoftSkill[];
  totalScore: number;
  totalGrade: string;
  position: string;
}

const SoftSkillSynergy: FC<ISoftSkillSynergy> = props => {
  const { softSkills, totalScore, totalGrade, position } = props;
  const breakPoint =
    softSkills.length > 12 ? 6 : Math.ceil(softSkills.length / 2);
  const maximumNumberOfCards = 8;

  return (
    <div className="SoftSkillSynergy">
      <div className="SoftSkillSynergy__Container">
        <div>
          {softSkills.slice(0, breakPoint).map(skill => {
            return <SoftSkillCard key={skill.id} softSkill={skill} />;
          })}
        </div>
      </div>

      <Convergence
        totalScore={totalScore}
        totalGrade={totalGrade}
        numberOfWaves={softSkills.length}
      />

      <div className="SoftSkillSynergy__Container">
        <div>
          {softSkills.slice(breakPoint, maximumNumberOfCards).map(skill => {
            return <SoftSkillCard key={skill.id} softSkill={skill} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SoftSkillSynergy;
