import './CandidateReportHeaderMobile.scss';
import React, { FC } from 'react';
import LogoutButton from '../../organisms/LogoutButton/LogoutButton';

interface ICandidateReportHeaderMobile {
  position: string;
  onClickWarningSign?: Function;
  onClickMenu?: Function;
}

const CandidateReportHeaderMobile: FC<ICandidateReportHeaderMobile> = props => {
  const { position } = props;

  return (
    <header className="CandidateReportHeaderMobile">
      <div className="CandidateReportHeaderMobile__Navigation">
        <LogoutButton />
      </div>
    </header>
  );
};

export default CandidateReportHeaderMobile;
