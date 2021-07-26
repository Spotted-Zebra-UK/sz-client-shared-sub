import React, { FC } from 'react';
import { SuccessProfileSoftSkillTypeIcons } from '../../../../../../constants/softSkillIcons';
import { SoftSkillType } from '../../../../../../enums/successProfile.enum';
import './SuccessProfileSoftSkillTypesLegendItem.scss';

interface ISuccessProfileSoftSkillTypesLegendItem {
  successProfileSoftSkillType: SoftSkillType;
}

const titles = {
  [SoftSkillType.CORE]: 'Core',
  [SoftSkillType.DIFFERENTIATOR]: 'Differentiator',
  [SoftSkillType.DIVERSITY]: 'Diversity',
};

const SuccessProfileSoftSkillTypesLegendItem: FC<ISuccessProfileSoftSkillTypesLegendItem> = ({
  successProfileSoftSkillType,
}) => {
  const Icon = SuccessProfileSoftSkillTypeIcons[successProfileSoftSkillType];
  const title = titles[successProfileSoftSkillType];

  return (
    <div
      className={`SuccessProfileSoftSkillTypesLegendItem SuccessProfileSoftSkillTypesLegendItem--${successProfileSoftSkillType}`}
    >
      <div className="SuccessProfileSoftSkillTypesLegendItem__IconWrapper">
        <Icon />
      </div>
      <p className="SuccessProfileSoftSkillTypesLegendItem__Title">{title}</p>
    </div>
  );
};

export default SuccessProfileSoftSkillTypesLegendItem;
