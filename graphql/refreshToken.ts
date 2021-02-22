import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import history from '../config/history';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../constants/authentication';
import {
  IRequestTokenRefreshInput,
  IRequestTokenRefreshResponse,
} from '../interfaces/authentication';
import { authenticationRoutes } from '../navigation/AuthNavigation/authNavigation.constants';

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

  return false;
};

export const requestTokenRefresh = async (
  client: ApolloClient<NormalizedCacheObject>
): Promise<boolean> => {
  try {
    const result = await requestTokenRefreshMutation(client);
    return result;
  } catch (error) {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    history.push(authenticationRoutes.login);
    client.clearStore();
    return false;
  }
};
