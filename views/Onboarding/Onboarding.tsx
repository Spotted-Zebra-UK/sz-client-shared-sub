import './Onboarding.scss';
import React, { FC, ReactElement, useState } from 'react';
import Navbar from '../../components/organisms/Navbar/Navbar';
import {
  firstPageContent,
  secondPageContent,
  thirdPageContent,
} from './Onboarding.contants';
import OnboardingContent from './OnboardingContent/OnboardingContent';
import UserSettings from './UserSettings/UserSettings';

interface IOnboarding {}

const Onboarding: FC<IOnboarding> = () => {
  const [page, setPage] = useState<number>(0);
  const showOnboardingPage: { [key in number]: ReactElement } = {
    0: (
      <OnboardingContent
        title={firstPageContent.title}
        description={firstPageContent.description}
        notes={firstPageContent.notes}
        btnText={firstPageContent.btnText}
        page={page}
        onNextClick={() => {
          setPage(1);
        }}
      />
    ),
    1: (
      <OnboardingContent
        title={secondPageContent.title}
        notes={secondPageContent.notes}
        page={page}
        btnText={secondPageContent.btnText}
        onNextClick={() => {
          setPage(2);
        }}
      />
    ),
    2: (
      <OnboardingContent
        title={thirdPageContent.title}
        page={page}
        notes={thirdPageContent.notes}
        btnText={thirdPageContent.btnText}
        onNextClick={() => {
          setPage(3);
        }}
      />
    ),
    3: (
      <UserSettings
        redirectTo="/stages"
        settings={{
          TR_displayOnboarding: true,
          CM_lastVisitedModule: false,
        }}
      />
    ),
  };

  return (
    <div>
      <Navbar />
      {showOnboardingPage[page]}
    </div>
  );
};

export default Onboarding;
