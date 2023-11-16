import './CandidateReportHeaderDesktop.scss';
import React, { FC } from 'react';
// import { Link } from 'react-router-dom';
import LogoutButton from '../../organisms/LogoutButton/LogoutButton';

interface ICandidateReportHeaderDesktop {
  position: string;
}

const CandidateReportHeaderDesktop: FC<ICandidateReportHeaderDesktop> =
  props => {
    // const { position } = props;

    return (
      <header className="CandidateReportHeaderDesktop Wrapper">
        <div className="CandidateReportHeaderDesktop__Container">
          <div className="CandidateReportHeaderDesktop__Container__Navigation">
            {/* <Link to="/stages">
            <img
              src={`${process.env.PUBLIC_URL}/CandidateReportHeader/arrowLeft.svg`}
              alt="ArrowLeft.svg"
            />
            <h6>{position}</h6>
          </Link> */}
          </div>
          <LogoutButton />
        </div>
      </header>
    );
  };

export default CandidateReportHeaderDesktop;
