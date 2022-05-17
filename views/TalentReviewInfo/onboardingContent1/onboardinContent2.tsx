import { FC } from 'react';
import ContainedButton from '../../../components/molecules/ContainedButton/ContainedButton';
import { ReactComponent as BrainIcon } from './ic_brain.svg';
import { ReactComponent as HatIcon } from './ic_hat.svg';
import { ReactComponent as IdeaIcon } from './ic_idea.svg';

interface IOnboardingContent2 {
  getPageCount: (count: number) => void;
}

const OnboardingContent2: FC<IOnboardingContent2> = ({ getPageCount }) => {
  const handleNextPage = () => {
    getPageCount(3);
  };
  return (
    <div>
      <p className="intro">Why are we doing this?</p>
      <div className="listGroup">
        <div className="reviewList">
          <div className="iconContainer">
            <BrainIcon className="icon" />
          </div>
          <span>
            To get a clear understanding of the overall capability of this
            leadership population
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <HatIcon className="icon" />
          </div>
          <span>
            To get an objective view of the areas that we need to focus on to
            improve leader performance
          </span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <IdeaIcon className="icon" />
          </div>
          <span>
            To develop a talent map that will indicate possible successors to
            key roles
          </span>
        </div>
      </div>
      <div className="btn-container">
        <ContainedButton className="center" onClick={handleNextPage}>
          Next
        </ContainedButton>
      </div>
    </div>
  );
};

export default OnboardingContent2;
