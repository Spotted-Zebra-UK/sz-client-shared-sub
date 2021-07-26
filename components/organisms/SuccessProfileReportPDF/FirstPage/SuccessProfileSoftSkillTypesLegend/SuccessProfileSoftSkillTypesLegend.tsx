import React, { FC } from 'react';
import { SoftSkillType } from '../../../../../enums/successProfile.enum';
import SuccessProfileSoftSkillTypesLegendItem from './SuccessProfileSoftSkillTypesLegendItem/SuccessProfileSoftSkillTypesLegendItem';
import './SuccessProfileSoftSkillTypesLegend.scss';

interface ISuccessProfileSoftSkillTypesLegend {
  softSkillTypes: SoftSkillType[];
}

const SuccessProfileSoftSkillTypesLegend: FC<ISuccessProfileSoftSkillTypesLegend> = ({
  softSkillTypes,
}) => {
  return (
    <div className="SuccessProfileSoftSkillTypesLegend">
      {softSkillTypes.map(type => (
        <SuccessProfileSoftSkillTypesLegendItem
          key={type}
          successProfileSoftSkillType={type}
        />
      ))}
    </div>
  );
};

export default SuccessProfileSoftSkillTypesLegend;
