import './CandidateReportHeaderDesktop.scss';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../../organisms/LogoutButton/LogoutButton';

interface ICandidateReportHeaderDesktop {
  position: string;
}

const CandidateReportHeaderDesktop: FC<ICandidateReportHeaderDesktop> =
  props => {
    return (
      <header className="CandidateReportHeaderDesktop Wrapper">
        <div className="CandidateReportHeaderDesktop__Container">
          <div className="CandidateReportHeaderDesktop__Container__Navigation"></div>
          <LogoutButton />
        </div>
      </header>
    );
  };

export default CandidateReportHeaderDesktop;
