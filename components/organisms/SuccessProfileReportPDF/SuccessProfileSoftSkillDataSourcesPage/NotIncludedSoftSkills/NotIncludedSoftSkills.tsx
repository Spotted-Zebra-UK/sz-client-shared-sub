import React, { FC } from 'react';
import { TSuccessProfileReportNotIncludedSoftSkills } from '../../../../../helpers/successProfileReport.interface';
import NotIncludedSoftSkillRow from './NotIncludedSoftSkillRow/NotIncludedSoftSkillRow';
import './NotIncludedSoftSkills.scss';

interface INotIncludedSoftSkills {
  notIncludedSoftSkills: TSuccessProfileReportNotIncludedSoftSkills;
}

const NotIncludedSoftSkills: FC<INotIncludedSoftSkills> = ({
  notIncludedSoftSkills,
}) => {
  return (
    <div className="NotIncludedSoftSkills">
      <div className="NotIncludedSoftSkills__Description">
        The following soft skills from the SZ model were evaluated for their
        potential relevance, but were not selected in the final Success Profile:
      </div>
      <div className="NotIncludedSoftSkills__SoftSkillRows">
        <NotIncludedSoftSkillRow
          title="Our success"
          notIncludedSoftSkills={notIncludedSoftSkills.ourSuccess}
        />
        <NotIncludedSoftSkillRow
          title="Your success"
          notIncludedSoftSkills={notIncludedSoftSkills.yourSuccess}
        />
        <NotIncludedSoftSkillRow
          title="Our future success"
          notIncludedSoftSkills={notIncludedSoftSkills.ourFutureSuccess}
        />
      </div>
    </div>
  );
};

export default NotIncludedSoftSkills;
