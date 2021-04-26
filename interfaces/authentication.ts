export interface IRegisterAccountInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  invitationToken?: string;
}

export interface IRegisterAccountResponse {
  registerAccount: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IAuthenticateInput {
  email: string;
  password: string;
}

export interface IAuthenticateResponse {
  authenticate: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IRequestTokenRefreshResponse {
  requestTokenRefresh: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IRequestTokenRefreshInput {
  accessToken: string;
  refreshToken: string;
}

export interface IDeauthenticateInput {
  accessToken: string;
}

export interface IRequestPasswordRecoveryInput {
  email: string;
}

export interface IUpdateIdentityPassword {
  recoveryToken: string;
  newPassword: string;
}
