import React, { FC } from 'react';
import { TSuccessProfileReportNotIncludedSoftSkill } from '../../../../../../helpers/successProfileReport.interface';
import './NotIncludedSoftSkillRow.scss';

interface INotIncludedSoftSkillRow {
  title: string;
  notIncludedSoftSkills: TSuccessProfileReportNotIncludedSoftSkill[];
}

const NotIncludedSoftSkillRow: FC<INotIncludedSoftSkillRow> = ({
  title,
  notIncludedSoftSkills,
}) => {
  return (
    <div className="NotIncludedSoftSkillRow">
      <h4 className="NotIncludedSoftSkillRow__Title">{title}</h4>
      <div className="NotIncludedSoftSkillRow__List">
        {notIncludedSoftSkills.map(notIncludedSoftSkill => (
          <div
            className="NotIncludedSoftSkillRow__List__Item"
            key={notIncludedSoftSkill.id}
          >
            {notIncludedSoftSkill.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotIncludedSoftSkillRow;
