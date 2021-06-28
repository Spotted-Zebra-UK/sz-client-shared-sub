import './SuccessProfileSoftSkillTypeSummary.scss';
import React, { FC } from 'react';
import { SuccessProfileSoftSkillTypeIcons } from '../../../../../constants/softSkillIcons';
import { SoftSkillType } from '../../../../../enums/successProfile.enum';
import EditorPreview from '../../../../molecules/Editor/EditorPreview/EditorPreview';

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
      <EditorPreview
        id={`success-profile-soft-skill-type-summary-${type}`}
        className="SuccessProfileSoftSkillTypeSummary__SummaryTextPreview"
        value={summary}
      />
    </div>
  );
};

export default SuccessProfileSoftSkillTypeSummary;
