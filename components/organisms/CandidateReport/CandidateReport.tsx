import React, { FC } from 'react';
import MediaQuery from 'react-responsive';
import { useQuery } from '@apollo/client';
import { GET_CANDIDATE_REPORT_DATA_QUERY } from '../../../graphql/candidateReport';
import { ICandidateReportData } from '../../../interfaces/candidateReport';
import CandidateReportDesktop from './CandidateReportDesktop/CandidateReportDesktop';
import CandidateReportMobile from './CandidateReportMobile/CandidateReportMobile';

interface ICandidateReport {
  candidateReportSubId: string;
  isHeaderVisible?: boolean;
}

const CandidateReport: FC<ICandidateReport> = ({
  candidateReportSubId,
  isHeaderVisible,
}) => {
  const getCandidateReportQueryResponse = useQuery(
    GET_CANDIDATE_REPORT_DATA_QUERY,
    {
      variables: { subId: candidateReportSubId },
    }
  );

  if (getCandidateReportQueryResponse.data) {
    const response = {
      ...getCandidateReportQueryResponse.data.response,
      ...JSON.parse(
        getCandidateReportQueryResponse.data.response.candidateData
      ),
    } as ICandidateReportData;

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
