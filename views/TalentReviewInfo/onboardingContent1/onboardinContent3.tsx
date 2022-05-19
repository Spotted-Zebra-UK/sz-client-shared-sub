import { FC } from 'react';
import ContainedButton from '../../../components/molecules/ContainedButton/ContainedButton';
import { ReactComponent as DescriptionIcon } from './description_black_24dp 1.svg';
import { ReactComponent as CupIcon } from './ic_cup.svg';
import { ReactComponent as ExternalIcon } from './ic_external.svg';
import { ReactComponent as MailIcon } from './mail_black_24dp 1.svg';
import { ReactComponent as TuneIcon } from './tune_black_24dp 1.svg';

interface IOnboardingContent3 {
  goToReviewPage: (value: boolean) => void;
}

const OnboardingContent3: FC<IOnboardingContent3> = ({ goToReviewPage }) => {
  const handleNextPage = () => {
    goToReviewPage(false);
  };
  return (
    <div>
      <p className="intro">What is next steps?</p>
      <div className="listGroup">
        <div className="reviewList">
          <div className="iconContainer">
            <CupIcon className="icon" />
          </div>
          <span>
            This assessment will ask you to rate your direct reports in relation
            to several behavioural statements.
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <ExternalIcon className="icon" />
          </div>
          <span>
            You will be asked to indicate any role, within or outside your
            division, that you believe this individual could be a good candidate
            for in the future, and provide an estimated time frame for this
            progression.
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <TuneIcon className="icon" />
          </div>
          <span>
            In addition, you will also be selecting the individuals who could be
            a successor for the role you are assessing. Is there someone who
            could step into this individual's position should they leave or move
            into another role?
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <DescriptionIcon className="icon" />
          </div>
          <span>
            Please think carefully about your ratings. We will be reviewing and
            calibrating each individual in order to identify the top 10% of this
            population as true high potentials. Award the highest ratings with
            care and consideration.
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <MailIcon className="icon" />
          </div>
          <span>
            Once you have completed the assessment, you will be able to view the
            calibration results on your Talent Review dashboard. You will be
            giving feedback to your direct reports based on these results.
          </span>
        </div>
      </div>
      <div className="btn-container">
        <ContainedButton className="center" onClick={handleNextPage}>
          Start Review
        </ContainedButton>
      </div>
    </div>
  );
};

export default OnboardingContent3;
