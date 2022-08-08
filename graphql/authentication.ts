import { gql } from '@apollo/client';

export const AUTHENTICATE_MUTATION = gql`
  mutation AuthenticateMutation(
    $email: String!
    $password: String!
    $mfaCookie: [String!]
  ) {
    authenticate(email: $email, password: $password, mfaCookie: $mfaCookie) {
      accessToken
      refreshToken
    }
  }
`;

export const GET_COMPANY_ID_BY_PROJECT = gql`
  query CompanyIdByProject($id: Float!) {
    getCompanyId(id: $id) {
      companyId
    }
  }
`;

export const REGISTER_ACCOUNT = gql`
  mutation RegisterAccountMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $companyId: Float!
    $invitationToken: String
  ) {
    registerAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      companyId: $companyId
      invitationToken: $invitationToken
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const DEAUTHENTICATE_MUTATION = gql`
  mutation Deauthenticate($accessToken: String!) {
    deauthenticate(accessToken: $accessToken)
  }
`;

export const REQUEST_PASSWORD_RECOVERY_MUTATION = gql`
  mutation RequestPasswordRecoveryMutation($email: String!) {
    requestPasswordRecovery(email: $email)
  }
`;

export const UPDATE_IDENTITY_PASSWORD_MUTATION = gql`
  mutation UpdateIdentityPassword(
    $recoveryToken: String!
    $newPassword: String!
  ) {
    updateIdentityPassword(
      recoveryToken: $recoveryToken
      newPassword: $newPassword
    )
  }
`;

/**
 *  ** Two factor authentication **
 * Refer to the Miro board for more information on queries below
 * https://miro.com/app/board/o9J_lsJDN6o=/
 */
export const MFA_ACCESS_TOKEN = gql`
  mutation MfaAccessToken($email: String!, $password: String!) {
    mfaAccessToken(email: $email, password: $password) {
      mfaAccessToken
    }
  }
`;

export const MFA_AUTHENTICATE = gql`
  mutation MfaAuthenticate($mfaAccessToken: String!, $mfaCode: Float!) {
    mfaAuthenticate(mfaAccessToken: $mfaAccessToken, mfaCode: $mfaCode) {
      accessToken
      refreshToken
      mfaCookie
    }
  }
`;

export const MFA_REQUEST_CODE = gql`
  mutation RequestMfaCode($mfaAccessToken: String!) {
    requestMfaCode(mfaAccessToken: $mfaAccessToken)
  }
`;
