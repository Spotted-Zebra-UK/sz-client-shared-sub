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
