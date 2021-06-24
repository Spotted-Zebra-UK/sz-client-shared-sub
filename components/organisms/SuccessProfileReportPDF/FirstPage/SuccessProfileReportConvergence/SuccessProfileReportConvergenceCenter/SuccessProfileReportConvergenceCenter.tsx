import React, { FC } from 'react';
import { ReactComponent as SuccessProfileGradientIcon } from '../../../../../../icons/SuccessProfileGradient.svg';
import './SuccessProfileReportConvergenceCenter.scss';

interface ISuccessProfileReportConvergenceCenter {
  projectName: string;
}

const SuccessProfileReportConvergenceCenter: FC<ISuccessProfileReportConvergenceCenter> = ({
  projectName,
}) => {
  return (
    <div className="SuccessProfileReportConvergenceCenter">
      <div className="SuccessProfileReportConvergenceCenter__IconWrapper">
        <SuccessProfileGradientIcon />
      </div>
      <h3 className="SuccessProfileReportConvergenceCenter__ProjectName">
        {projectName}
      </h3>
      <h4 className="SuccessProfileReportConvergenceCenter__Subtitle">
        Success Profile
      </h4>
    </div>
  );
};

export default SuccessProfileReportConvergenceCenter;
