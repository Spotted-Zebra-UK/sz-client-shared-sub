import './OnboardingNavbar.scss';
import React, { FC, useState } from 'react';
import UserSettings from '../UserSettings/UserSettings';

interface IOnboardingNavbar {
  pageNumber: string;
}

const OnboardingNavbar: FC<IOnboardingNavbar> = ({ pageNumber }) => {
  const [skipped, setSkipped] = useState<boolean>(false);
  if (skipped) {
    return (
      <UserSettings
        redirectTo="/stages"
        settings={{
          CM_lastVisitedModule: false,
          TR_displayOnboarding: true,
        }}
      />
    );
  }

  return (
    <div className="navbar-onboard">
      <div className="nav-first-item">
        <div className="current-page">{pageNumber}</div>of 3
      </div>
      <div className="nav-second-item" onClick={() => setSkipped(true)}>
        Skip
      </div>
    </div>
  );
};

export default OnboardingNavbar;
