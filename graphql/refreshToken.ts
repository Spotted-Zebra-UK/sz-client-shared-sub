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
  const accessToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
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
      localStorage.setItem(
        AUTH_TOKEN_STORAGE_KEY,
        response.data.requestTokenRefresh.accessToken
      );
      localStorage.setItem(
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
