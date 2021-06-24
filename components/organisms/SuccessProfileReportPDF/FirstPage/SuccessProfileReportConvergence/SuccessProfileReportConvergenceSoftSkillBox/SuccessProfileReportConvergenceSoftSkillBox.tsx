import React, { FC } from 'react';
import {
  SoftSkillIcons,
  SuccessProfileSoftSkillTypeIcons,
} from '../../../../../../constants/softSkillIcons';
import { SoftSkillType } from '../../../../../../enums/successProfile.enum';
import './SuccessProfileReportConvergenceSoftSkillBox.scss';

interface ISuccessProfileReportConvergenceSoftSkillBox {
  softSkillId: number;
  softSkillName: string;
  softSkillSummary: string;
  softSkillType: SoftSkillType;
}

// eslint-disable-next-line max-len
const SuccessProfileReportConvergenceSoftSkillBox: FC<ISuccessProfileReportConvergenceSoftSkillBox> = ({
  softSkillId,
  softSkillName,
  softSkillSummary,
  softSkillType,
}) => {
  const Icon = SoftSkillIcons[softSkillId];
  const SoftSkillTypeIcon = SuccessProfileSoftSkillTypeIcons[softSkillType];

  return (
    <div className="SuccessProfileReportConvergenceSoftSkillBox">
      <div
        className={`SuccessProfileReportConvergenceSoftSkillBox__SoftSkillType SuccessProfileReportConvergenceSoftSkillBox__SoftSkillType--${softSkillType}`}
      >
        <SoftSkillTypeIcon className="SuccessProfileReportConvergenceSoftSkillBox__SoftSkillType__Icon" />
      </div>
      <div className="SuccessProfileReportConvergenceSoftSkillBox__Header">
        <Icon className="SuccessProfileReportConvergenceSoftSkillBox__Header__Icon" />
        <div className="SuccessProfileReportConvergenceSoftSkillBox__Header__Title">
          {softSkillName}
        </div>
      </div>
      <p className="SuccessProfileReportConvergenceSoftSkillBox__Summary">
        {softSkillSummary}
      </p>
    </div>
  );
};

export default SuccessProfileReportConvergenceSoftSkillBox;
