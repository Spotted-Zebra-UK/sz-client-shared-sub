import './TalentReviewInfo.scss';
import { FC, useState } from 'react';
import Container from '../../components/molecules/Container/Container';
import LOGO_ENTAIN from '../../icons/logos/lg_entain.png';
import OnboardingContent1 from './onboardingContent1/onboardinContent1';
import OnboardingContent2 from './onboardingContent1/onboardinContent2';
import OnboardingContent3 from './onboardingContent1/onboardinContent3';
import TRNavbar from './TRNavbar/TRNavbar';

interface ITalentReviewInfo {
  goToReviewPage?: (value: boolean) => void;
  companyImage?: string;
}

const TalentReviewInfo: FC<ITalentReviewInfo> = ({
  goToReviewPage,
  companyImage,
}) => {
  const [pageCount, setPageCount] = useState<number>(1);
  const getPageCount = (count: number) => {
    setPageCount(count);
  };

  return (
    <>
      <Container className="StagePresentationalContainer TalentReviewList">
        <TRNavbar pageCount={pageCount} goToReviewPage={goToReviewPage} />
        <div className="TalentReviewInfo">
          <img
            className="logo-img"
            height={33}
            src={companyImage || LOGO_ENTAIN}
            alt="logo"
          />
          {pageCount === 1 && (
            <OnboardingContent1 getPageCount={getPageCount} />
          )}
          {pageCount === 2 && (
            <OnboardingContent2 getPageCount={getPageCount} />
          )}
          {pageCount === 3 && (
            <OnboardingContent3 goToReviewPage={goToReviewPage} />
          )}
        </div>
      </Container>
    </>
  );
};

export default TalentReviewInfo;
