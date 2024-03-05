import { gql } from '@apollo/client';

export const GET_COMPANY_ID_BY_PROJECT = gql`
  query CompanyIdByProject($id: Float!) {
    getCompanyId(id: $id) {
      companyId
    }
  }
`;

export const DEAUTHENTICATE_MUTATION = gql`
  mutation Deauthenticate($accessToken: String!) {
    deauthenticate(accessToken: $accessToken)
  }
`;
