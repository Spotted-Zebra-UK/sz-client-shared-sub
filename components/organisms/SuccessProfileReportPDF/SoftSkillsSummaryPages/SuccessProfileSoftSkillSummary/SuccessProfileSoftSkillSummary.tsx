import './SuccessProfileSoftSkillSummary.scss';
import React, { FC } from 'react';
import { SoftSkillIcons } from '../../../../../constants/softSkillIcons';
import { SoftSkillType } from '../../../../../enums/successProfile.enum';
import EditorPreview from '../../../../molecules/Editor/EditorPreview/EditorPreview';

interface ISuccessProfileSoftSkillSummary {
  softSkillId: number;
  name: string;
  mainText: string;
  successProfileSoftSkillType: SoftSkillType;
}

const SuccessProfileSoftSkillSummary: FC<ISuccessProfileSoftSkillSummary> = ({
  softSkillId,
  name,
  mainText,
  successProfileSoftSkillType,
}) => {
  const Icon = SoftSkillIcons[softSkillId];

  return (
    <div
      className={`SuccessProfileSoftSkillSummary SuccessProfileSoftSkillSummary--${successProfileSoftSkillType}`}
    >
      <div className="SuccessProfileSoftSkillSummary__IconWrapper">
        <Icon />
      </div>
      <div className="SuccessProfileSoftSkillSummary__Content">
        <h4 className="SuccessProfileSoftSkillSummary__Content__SoftSkillName">
          {name}
        </h4>
        <div className="SuccessProfileSoftSkillSummary__Content__Summary">
          {mainText.split('\n').map((mainTextParagraph, index) => (
            <EditorPreview
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="SuccessProfileSoftSkillSummary__Content__Summary__Preview"
              value={mainTextParagraph}
              id={`softSkillSummary-${softSkillId}-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessProfileSoftSkillSummary;
