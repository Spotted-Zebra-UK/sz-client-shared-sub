import { gql } from '@apollo/client';

export const DEAUTHENTICATE_MUTATION = gql`
  mutation Deauthenticate($accessToken: String!) {
    deauthenticate(accessToken: $accessToken)
  }
`;
