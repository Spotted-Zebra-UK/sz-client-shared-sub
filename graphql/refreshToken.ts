import { logoutCleanup } from 'helpers/logout';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from 'constants/authentication';
import {
  IRequestTokenRefreshInput,
  IRequestTokenRefreshResponse,
} from '../interfaces/authentication';
import { getCookie, setCookie } from 'helpers/cookies';

export const REQUEST_TOKEN_REFRESH = gql`
  mutation RequestTokenRefresh($accessToken: String!, $refreshToken: String!) {
    requestTokenRefresh(
      accessToken: $accessToken
      refreshToken: $refreshToken
    ) {
      accessToken
      refreshToken
    }
  }
`;

const requestTokenRefreshMutation = async (
  client: ApolloClient<NormalizedCacheObject>
): Promise<boolean> => {
  const accessToken = getCookie(AUTH_TOKEN_STORAGE_KEY);
  const refreshToken = getCookie(REFRESH_TOKEN_STORAGE_KEY);
  if (accessToken && refreshToken) {
    const response = await client.mutate<
      IRequestTokenRefreshResponse,
      IRequestTokenRefreshInput
    >({
      mutation: REQUEST_TOKEN_REFRESH,
      variables: {
        accessToken,
        refreshToken,
      },
    });

    if (response.data) {
      setCookie(
        AUTH_TOKEN_STORAGE_KEY,
        response.data.requestTokenRefresh.accessToken
      );
      setCookie(
        REFRESH_TOKEN_STORAGE_KEY,
        response.data.requestTokenRefresh.refreshToken
      );

      return true;
    }
  }

  if (accessToken && !refreshToken) {
    logoutCleanup();
  }

  return false;
};

export const requestTokenRefresh = async (
  client: ApolloClient<NormalizedCacheObject>
): Promise<boolean> => {
  try {
    const result = await requestTokenRefreshMutation(client);
    return result;
  } catch (error) {
    logoutCleanup();
    return false;
  }
};
