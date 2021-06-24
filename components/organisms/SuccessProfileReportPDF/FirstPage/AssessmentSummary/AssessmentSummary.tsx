import React, { FC } from 'react';
import { TSuccessProfileReportAssessmentSummary } from '../../../../../helpers/successProfileReport.interface';
import { ReactComponent as TimerIcon } from '../../../../../icons/Timer.svg';
import { getTotalTimeString } from './AssessmentSummary.helpers';
import './AssessmentSummary.scss';
import TestSummary from './TestSummary/TestSummary';

interface IAssessmentSummary {
  assessmentSummary: TSuccessProfileReportAssessmentSummary;
}

const AssessmentSummary: FC<IAssessmentSummary> = ({
  assessmentSummary: { totalTime, testsSummary },
}) => {
  const renderTestsSummary = () => {
    return (
      <div className="AssessmentSummary__TestsSummary">
        {testsSummary.map(testSummary => (
          <TestSummary key={testSummary.id} testSummary={testSummary} />
        ))}
      </div>
    );
  };

  return (
    <div className="AssessmentSummary">
      <div className="AssessmentSummary__Heading">
        <div className="AssessmentSummary__Heading__Content">
          <div className="AssessmentSummary__Heading__Content__TotalTime">
            <TimerIcon className="AssessmentSummary__Heading__Content__TotalTime__Icon" />
            <h4 className="AssessmentSummary__Heading__Content__TotalTime__Text">
              {getTotalTimeString(totalTime)}
            </h4>
          </div>
        </div>
        <div className="AssessmentSummary__Heading__BorderBottom" />
        {renderTestsSummary()}
      </div>
    </div>
  );
};

export default AssessmentSummary;
