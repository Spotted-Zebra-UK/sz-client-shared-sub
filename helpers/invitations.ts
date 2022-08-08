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

export const findProjectIdIndirectInvitationUrl = (
  url: string
): { projectId: number; companyId: number } => {
  const projectId = url.substring(url.search('project=') + 8, url.search('&'));
  const companyId = url.substring(
    url.search('companyId=') + 10,
    url.search('&')
  );

  return {
    projectId: parseInt(projectId),
    companyId: parseInt(companyId),
  };
};
