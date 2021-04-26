import { gql } from '@apollo/client';

export const AUTHENTICATE_MUTATION = gql`
  mutation AuthenticateMutation($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER_ACCOUNT = gql`
  mutation RegisterAccountMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $invitationToken: String
  ) {
    registerAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
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
