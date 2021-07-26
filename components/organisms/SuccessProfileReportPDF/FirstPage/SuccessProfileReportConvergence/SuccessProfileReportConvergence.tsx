import React, { FC } from 'react';
import ConvergenceDynamic from '../../../../molecules/ConvergenceDynamic/ConvergenceDynamic';
import { TSuccessProfileReportSoftSkill } from '../../../../../helpers/successProfileReport.interface';
import SuccessProfileReportConvergenceCenter from './SuccessProfileReportConvergenceCenter/SuccessProfileReportConvergenceCenter';
import SuccessProfileReportConvergenceSoftSkillBox from './SuccessProfileReportConvergenceSoftSkillBox/SuccessProfileReportConvergenceSoftSkillBox';

interface ISuccessProfileReportConvergence {
  successProfileReportSoftSkills: TSuccessProfileReportSoftSkill[];
  projectName: string;
}

const SuccessProfileReportConvergence: FC<ISuccessProfileReportConvergence> = ({
  successProfileReportSoftSkills,
  projectName,
}) => {
  const softSkillBoxesContent = successProfileReportSoftSkills.map(
    softSkill => (
      <SuccessProfileReportConvergenceSoftSkillBox
        key={softSkill.id}
        softSkillId={softSkill.softSkillId}
        softSkillName={softSkill.name}
        softSkillSummary={softSkill.subText}
        softSkillType={softSkill.type}
      />
    )
  );

  return (
    <ConvergenceDynamic
      numberOfWaves={successProfileReportSoftSkills.length}
      renderBoxesContent={softSkillBoxesContent}
      renderCenter={
        <SuccessProfileReportConvergenceCenter projectName={projectName} />
      }
      className="SuccessProfileReportConvergence"
    />
  );
};

export default SuccessProfileReportConvergence;
