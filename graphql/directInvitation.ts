import { gql } from '@apollo/client';

export const GET_INVITATION_STATUS_QUERY = gql`
  query GetInvitationStatus($invitationToken: String!) {
    getInvitationStatus(invitationToken: $invitationToken) {
      isExpired
      isCompleted
    }
  }
`;
