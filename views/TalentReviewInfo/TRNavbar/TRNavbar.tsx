import './TRNavbar.scss';
import { FC } from 'react';

interface ITRNavbar {
  pageCount: number;
  goToReviewPage: (value: boolean) => void;
}

const TRNavbar: FC<ITRNavbar> = ({ pageCount, goToReviewPage }) => {
  const handleSkip = () => {
    goToReviewPage(false);
  };

  return (
    <div className="TRNavbar">
      <p className="TRNavbar__pageCountContainer">
        <span className="TRNavbar__pageCountContainer__pageCount">
          {pageCount}
        </span>
        <span>of 3</span>
      </p>
      <p className="TRNavbar__skip" onClick={handleSkip}>
        skip
      </p>
    </div>
  );
};

export default TRNavbar;
