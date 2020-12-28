import jwt from 'jsonwebtoken';
import { IInvitationData } from '../interfaces/invitation';

interface IParsedInvitationToken {
  invitationData: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const parseInvitationToken = (
  urlSearch: string
): IInvitationData | undefined => {
  const queryParams = new URLSearchParams(urlSearch);
  const invToken = queryParams.get('inv');
  if (!invToken) {
    return undefined;
  }

  const parsedInvitation = jwt.decode(
    invToken
  ) as IParsedInvitationToken | null;

  if (!parsedInvitation || !parsedInvitation.invitationData) {
    return undefined;
  }

  return {
    token: invToken,
    candidateData: {
      email: parsedInvitation.invitationData.email,
      fullName: `${parsedInvitation.invitationData.firstName} ${parsedInvitation.invitationData.lastName}`,
    },
  };
};
