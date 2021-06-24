import React, { FC } from 'react';
import { SuccessProfileSoftSkillTypeIcons } from '../../../../../constants/softSkillIcons';
import { SoftSkillType } from '../../../../../enums/successProfile.enum';

import './SuccessProfileSoftSkillTypeSummary.scss';

interface ISuccessProfileSoftSkillTypeSummary {
  type: SoftSkillType;
  title: string;
  summary: string;
}

const SuccessProfileSoftSkillTypeSummary: FC<ISuccessProfileSoftSkillTypeSummary> = ({
  type,
  title,
  summary,
}) => {
  const Icon = SuccessProfileSoftSkillTypeIcons[type];

  return (
    <div
      className={`SuccessProfileSoftSkillTypeSummary SuccessProfileSoftSkillTypeSummary--${type}`}
    >
      <div className="SuccessProfileSoftSkillTypeSummary__Heading">
        <Icon />
        <h4 className="SuccessProfileSoftSkillTypeSummary__Heading__Title">
          {title}
        </h4>
      </div>
      <p className="SuccessProfileSoftSkillTypeSummary__SummaryText">
        {summary}
      </p>
    </div>
  );
};

export default SuccessProfileSoftSkillTypeSummary;
