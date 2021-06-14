import React, { FC } from 'react';
import MediaQuery from 'react-responsive';
import { useQuery } from '@apollo/client';
import { GET_CANDIDATE_REPORT_DATA_QUERY } from '../../../graphql/candidateReport';
import {
  ICandidateReportCandidateDataInput,
  ICandidateReportCandidateDataResponse,
} from '../../../interfaces/candidateReport';
import CandidateReportDesktop from './CandidateReportDesktop/CandidateReportDesktop';
import CandidateReportMobile from './CandidateReportMobile/CandidateReportMobile';
import { parseCandidateReport } from './parseCandidateReport';

interface ICandidateReport {
  candidateReportSubId: string;
  isHeaderVisible?: boolean;
}

const CandidateReport: FC<ICandidateReport> = ({
  candidateReportSubId,
  isHeaderVisible,
}) => {
  const getCandidateReportQueryResponse = useQuery<
    ICandidateReportCandidateDataResponse,
    ICandidateReportCandidateDataInput
  >(GET_CANDIDATE_REPORT_DATA_QUERY, {
    variables: { subId: candidateReportSubId },
  });

  if (getCandidateReportQueryResponse.data) {
    const response = parseCandidateReport(getCandidateReportQueryResponse.data);

    return (
      <>
        <MediaQuery minDeviceWidth={900}>
          <CandidateReportDesktop
            candidateReport={response}
            isHeaderVisible={isHeaderVisible}
          />
        </MediaQuery>

        <MediaQuery maxDeviceWidth={899}>
          <CandidateReportMobile
            candidateReport={response}
            isHeaderVisible={isHeaderVisible}
          />
        </MediaQuery>
      </>
    );
  }

  return null;
};

export default CandidateReport;
