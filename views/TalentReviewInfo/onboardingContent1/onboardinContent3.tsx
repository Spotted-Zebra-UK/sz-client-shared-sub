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
            This assessment will ask you to rate your direct report in relation
            to several behavioural statements.
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <ExternalIcon className="icon" />
          </div>
          <span>
            You will also be asked to provide free text comments to support your
            perspective, and to indicate any role that you believe this
            individual could be a successor for in the future.
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <TuneIcon className="icon" />
          </div>
          <span>
            Please think carefully about your ratings. We will be reviewing and
            calibrating each individual, with a view to identifying the top 10%
            of this population as true high potentials. So award the highest
            ratings with care and consideration.
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <DescriptionIcon className="icon" />
          </div>
          <span>
            Once you have completed the assessment, a report will generate for
            this individual. It will display your overall talent rating for the
            individual, as well as scores on the Values, Performance and
            Potential domains.
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <MailIcon className="icon" />
          </div>
          <span>
            You will be emailed this report and be able to access it via the SZ
            portal. If you have more than one direct report, you will also be
            provided with an aggregate report with data for your team at the end
            of this process.
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
