import React, { FC } from 'react';
import { ReactComponent as SpeakingIcon } from '../../../../icons/Speaking.svg';
import './ExampleInterviewQuestionPage.scss';
import SuccessProfileReportPageContainer from '../SuccessProfileReportPageContainer/SuccessProfileReportPageContainer';
import SoftSkillOverviewFull from '../../../molecules/SoftSkillOverviewFull/SoftSkillOverviewFull';

interface IExampleInterviewQuestionPage {
  companyLogoUrl: string | undefined;
  projectName: string;
  projectCreatedAt: string;
}

const ExampleInterviewQuestionPage: FC<IExampleInterviewQuestionPage> = ({
  companyLogoUrl,
  projectCreatedAt,
  projectName,
}) => {
  const exampleSoftSkill = {
    name: 'makes things happen',
    color: 'green',
    grade: 'A',
    text:
      "Working in a busy, dynamic context in which there's a need to act proactively and take the lead is very likely to suit the candidate's style.",
    traits: [
      {
        name: 'Thrives on activity',
        color: 'green',
        icon: 'Trait/lightBulb.svg',
        bullet: 'Thrives on activity',
      },
      {
        name: 'Sets stretching goals',
        color: 'green',
        icon: 'Trait/lightBulb.svg',
        bullet: 'Sets stretching goals',
      },
      {
        name: 'Seeks to win',
        color: 'green',
        icon: 'Trait/lightBulb.svg',
        bullet: 'Seeks to win',
      },
      {
        name: 'Shows a proactive approach',
        icon: 'Trait/hat.svg',
        color: 'transparent',
        bullet: 'Shows a proactive approach',
      },
    ],
  };

  return (
    <SuccessProfileReportPageContainer
      className="ExampleInterviewQuestionPage"
      pageKey="exampleInterviewQuestionPage"
      projectCreatedAt={projectCreatedAt}
      projectName={projectName}
      companyLogoUrl={companyLogoUrl}
    >
      <div className="ExampleInterviewQuestionPage__Description">
        <h3 className="ExampleInterviewQuestionPage__Description__Title">
          Example interview Question
        </h3>
        <p className="ExampleInterviewQuestionPage__Description__Text">
          Finally, Spotted Zebra Hiring Manager reports will provide interview
          questions that enable you to ask questions to probe each candidate’s
          alignment with each soft skill based on the responses they provided to
          the SZ assessment. An example question for one of the soft skills in
          this Success Profile is provided as follows:
        </p>
      </div>
      <div className="ExampleInterviewQuestionPage__Example">
        <div className="ExampleInterviewQuestionPage__Example__SoftSkillOverviewWrapper">
          <SoftSkillOverviewFull softSkill={exampleSoftSkill} />
        </div>
        <div className="ExampleInterviewQuestionPage__Questions">
          <div className="ExampleInterviewQuestionPage__Questions__Title">
            <SpeakingIcon className="ExampleInterviewQuestionPage__Questions__Title__Icon" />
            <div className="ExampleInterviewQuestionPage__Questions__Title__Text">
              Recommended Question
            </div>
          </div>
          <div className="ExampleInterviewQuestionPage__Questions__Content">
            <div className="ExampleInterviewQuestionPage__Questions__Content__QuestionsReason">
              The candidate's assessment responses suggest that they prefer to
              wait until they have all available information before starting a
              task, and that there are times when they could show a more
              proactive response. This question has been designed to enable you
              to explore the contexts in which they would be more likely to get
              started on a project without delay.
            </div>
            <p className="ExampleInterviewQuestionPage__Questions__Content__SubQuestion">
              - Can you describe the last time that you started a task without
              having all of the
            </p>
            <p className="ExampleInterviewQuestionPage__Questions__Content__SubQuestion">
              - What made you start the task proactively rather than waiting for
              everything you needed?
            </p>
            <p className="ExampleInterviewQuestionPage__Questions__Content__SubQuestion">
              - What was the outcome of this situation?
            </p>
            <p className="ExampleInterviewQuestionPage__Questions__Content__SubQuestion">
              - What feedback did you receive?
            </p>
            <p className="ExampleInterviewQuestionPage__Questions__Content__SubQuestion">
              - What would you do differently next time?
            </p>
          </div>
        </div>
      </div>
    </SuccessProfileReportPageContainer>
  );
};

export default ExampleInterviewQuestionPage;
