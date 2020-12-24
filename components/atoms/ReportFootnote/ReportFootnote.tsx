import './ReportFootnote.scss';
import moment from 'moment';
import React, { FC } from 'react';

interface IReportFootnote {
  position: string;
  reportDate: string;
}

const ReportFootnote: FC<IReportFootnote> = props => {
  const { position, reportDate } = props;

  return (
    <div className="ReportFootnote">
      <span className="ReportFootnote__Position">{position}</span>
      <span className="ReportFootnote__Text">
        {' | Candidate report created '}
      </span>
      <span className="ReportFootnote__Date">
        {moment(reportDate, 'x').format('D MMMM YYYY')}
      </span>
    </div>
  );
};

export default ReportFootnote;
