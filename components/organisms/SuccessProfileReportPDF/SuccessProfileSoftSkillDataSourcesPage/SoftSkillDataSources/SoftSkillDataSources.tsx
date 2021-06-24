import React, { FC } from 'react';
import SoftSkillDataSourcesRow from './SoftSkillDataSourcesRow/SoftSkillDataSourcesRow';
import './SoftSkillDataSources.scss';
import { SoftSkillType } from '../../../../../enums/successProfile.enum';
import { TSuccessProfileReportSoftSkill } from '../../../../../helpers/successProfileReport.interface';

interface ISoftSkillDataSources {
  successProfileReportSoftSkills: TSuccessProfileReportSoftSkill[];
}

const SoftSkillDataSources: FC<ISoftSkillDataSources> = ({
  successProfileReportSoftSkills,
}) => {
  const differentiatorSoftSkills = successProfileReportSoftSkills.filter(
    softSkill => softSkill.type === SoftSkillType.DIFFERENTIATOR
  );
  const coreSoftSkills = successProfileReportSoftSkills.filter(
    softSkill => softSkill.type === SoftSkillType.CORE
  );
  const diversitySoftSkills = successProfileReportSoftSkills.filter(
    softSkill => softSkill.type === SoftSkillType.DIVERSITY
  );

  return (
    <div className="SoftSkillDataSources">
      <SoftSkillDataSourcesRow
        softSkillType={SoftSkillType.DIFFERENTIATOR}
        successProfileReportSoftSkills={differentiatorSoftSkills}
      />
      <SoftSkillDataSourcesRow
        softSkillType={SoftSkillType.CORE}
        successProfileReportSoftSkills={coreSoftSkills}
      />
      <SoftSkillDataSourcesRow
        softSkillType={SoftSkillType.DIVERSITY}
        successProfileReportSoftSkills={diversitySoftSkills}
      />
    </div>
  );
};

export default SoftSkillDataSources;
