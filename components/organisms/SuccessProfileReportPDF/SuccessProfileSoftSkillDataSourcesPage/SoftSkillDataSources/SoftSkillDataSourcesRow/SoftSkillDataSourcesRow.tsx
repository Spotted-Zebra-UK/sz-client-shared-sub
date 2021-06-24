import React, { FC } from 'react';
import SoftSkillDataSourcesRowCard from './SoftSkillDataSourcesRowCard/SoftSkillDataSourcesRowCard';
import './SoftSkillDataSourcesRow.scss';
import { SuccessProfileSoftSkillTypeIcons } from '../../../../../../constants/softSkillIcons';
import { SoftSkillType } from '../../../../../../enums/successProfile.enum';
import { TSuccessProfileReportSoftSkill } from '../../../../../../helpers/successProfileReport.interface';

interface ISoftSkillDataSourcesRow {
  softSkillType: SoftSkillType;
  successProfileReportSoftSkills: TSuccessProfileReportSoftSkill[];
}

const softSkillDataSourcesRowTitleObj = {
  [SoftSkillType.DIFFERENTIATOR]: 'Differentiator',
  [SoftSkillType.CORE]: 'Core',
  [SoftSkillType.DIVERSITY]: 'Diversity',
};

const SoftSkillDataSourcesRow: FC<ISoftSkillDataSourcesRow> = ({
  softSkillType,
  successProfileReportSoftSkills,
}) => {
  const TitleIcon = SuccessProfileSoftSkillTypeIcons[softSkillType];
  const title = softSkillDataSourcesRowTitleObj[softSkillType];

  if (!successProfileReportSoftSkills.length) {
    return null;
  }

  return (
    <div
      className={`SoftSkillDataSourcesRow SoftSkillDataSourcesRow--${softSkillType}`}
    >
      <div className="SoftSkillDataSourcesRow__Title">
        <TitleIcon className="SoftSkillDataSourcesRow__Title__Icon" />
        <h6 className="SoftSkillDataSourcesRow__Title__Text">{title}</h6>
      </div>
      <div className="SoftSkillDataSourcesRow__Content">
        {successProfileReportSoftSkills.map(softSkill => (
          <SoftSkillDataSourcesRowCard
            key={softSkill.id}
            successProfileReportSoftSkill={softSkill}
          />
        ))}
      </div>
    </div>
  );
};

export default SoftSkillDataSourcesRow;
