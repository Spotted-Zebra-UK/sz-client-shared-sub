import './CandidateReportFooter.scss';
import React, { FC } from 'react';
import ReportFootnote from '../../atoms/ReportFootnote/ReportFootnote';

interface ICandidateReportFooter {
  position: string;
  reportDate: string;
}

const CandidateReportFooter: FC<ICandidateReportFooter> = props => {
  const { position, reportDate } = props;

  return (
    <footer className="CandidateReportFooter">
      <div className="CandidateReportFooter__Container">
        <ReportFootnote position={position} reportDate={reportDate} />
      </div>
    </footer>
  );
};

export default CandidateReportFooter;
