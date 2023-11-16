import './CandidateReportHeaderMobile.scss';
import React, { FC } from 'react';
// import { Link } from 'react-router-dom';
import LogoutButton from '../../organisms/LogoutButton/LogoutButton';

interface ICandidateReportHeaderMobile {
  position: string;
  onClickWarningSign?: Function;
  onClickMenu?: Function;
}

const CandidateReportHeaderMobile: FC<ICandidateReportHeaderMobile> = props => {
  // const { position } = props;

  return (
    <header className="CandidateReportHeaderMobile">
      <div className="CandidateReportHeaderMobile__Navigation">
        {/* <Link to="/stages">
          <img
            src={`${process.env.PUBLIC_URL}/CandidateReportHeader/arrowLeft.svg`}
            alt="ArrowLeft.svg"
          />
          <h6>{position}</h6>
        </Link> */}
        <LogoutButton />
      </div>
    </header>
  );
};

export default CandidateReportHeaderMobile;
