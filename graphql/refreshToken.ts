import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { logoutCleanup } from '../../../helpers/logout';
import Cookies from 'js-cookie';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../constants/authentication';
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
  const accessToken = Cookies.get(AUTH_TOKEN_STORAGE_KEY);
  const refreshToken = Cookies.get(REFRESH_TOKEN_STORAGE_KEY);

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
      Cookies.set(
        AUTH_TOKEN_STORAGE_KEY,
        response.data.requestTokenRefresh.accessToken
      );
      Cookies.set(
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
