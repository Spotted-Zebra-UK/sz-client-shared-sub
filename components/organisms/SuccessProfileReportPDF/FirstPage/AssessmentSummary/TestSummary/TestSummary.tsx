import React, { FC } from 'react';
import testIcons from '../../../../../../constants/testIcons';
import { Tests } from '../../../../../../enums/test.enum';
import { TSuccessProfileReportAssessmentSummaryTestSummary } from '../../../../../../helpers/successProfileReport.interface';
import { getTotalTimeString } from '../AssessmentSummary.helpers';
import './TestSummary.scss';

interface ITestSummary {
  testSummary: TSuccessProfileReportAssessmentSummaryTestSummary;
}

const testName = {
  [Tests.COGNITIVE_COMBINED]: 'Cognitive combined',
  [Tests.INDUCTIVE]: 'Inductive',
  [Tests.MOTIVATION]: 'Motivation',
  [Tests.NUMERICAL]: 'Numerical',
  [Tests.PERSONALITY]: 'Personality',
  [Tests.VERBAL]: 'Verbal',
};

const TestSummary: FC<ITestSummary> = ({ testSummary }) => {
  const Icon = testIcons[testSummary.type];
  return (
    <div className="TestSummary">
      <div className="TestSummary__Heading">
        <Icon className="TestSummary__Heading__Icon" />
        <h4 className="TestSummary__Heading__Text">
          {testName[testSummary.type]}
        </h4>
      </div>
      <p className="TestSummary__Text">{testSummary.summary}</p>
      <p className="TestSummary__Time">
        {getTotalTimeString(testSummary.time)}
      </p>
    </div>
  );
};

export default TestSummary;
