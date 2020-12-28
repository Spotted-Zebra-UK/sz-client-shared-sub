export type IInvitationData = {
  token: string;
  candidateData: {
    email: string;
    fullName: string;
  };
};

export interface IGetInvitationStatusQueryInput {
  invitationToken: string;
}

export interface IGetInvitationStatusQueryResponse {
  getInvitationStatus: {
    isCompleted: boolean;
    isExpired: boolean;
  };
}
