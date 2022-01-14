export interface IRegisterAccountInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyId: number;
  invitationToken?: string;
}

export interface IRegisterAccountResponse {
  registerAccount: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IGetCompanyIdInput {
  id: number; // projectId
}

export interface IGetCompanyIdResponse {
  getCompanyId: {
    companyId: number;
  };
}

export interface IAuthenticateInput {
  email: string;
  password: string;
  mfaCookie: string[];
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

/**
 *  ** Two factor authentication **
 * Refer to the Miro board for more information on queries below
 * https://miro.com/app/board/o9J_lsJDN6o=/
 */
export interface IMfaAccessTokenInput {
  email: string;
  password: string;
}

export interface IMfaAccessTokenResponse {
  mfaAccessToken: {
    mfaAccessToken: string;
  };
}

export interface IMfaAuthenticateInput {
  mfaAccessToken: string;
  mfaCode: number;
}

export interface IMfaAuthenticateResponse {
  mfaAuthenticate: {
    accessToken: string;
    refreshToken: string;
    mfaCookie: string; // jwt
  };
}

export interface IMfaRequestCodeInput {
  mfaAccessToken: string;
}
