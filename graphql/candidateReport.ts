import { gql } from '@apollo/client';

export const GET_CANDIDATE_REPORT_DATA_QUERY = gql`
  query GetCandidateReportData($subId: String!) {
    response: getCandidateReportData(subId: $subId) {
      id
      subId
      createdAt
      candidateData
    }
  }
`;
