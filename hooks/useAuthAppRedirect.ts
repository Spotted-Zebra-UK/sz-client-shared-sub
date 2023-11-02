import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AUTH_TOKEN_STORAGE_KEY } from '../constants/authentication';

export enum AUTH_APP_ROUTES {
  RESET_PASSWORD = 'reset-password',
  SET_NEW_PASSWORD = 'set-new-password',
  SIGNUP = 'sign-up',
}

type QueryParamsProps = {
  [key: string]: string;
};

export const getIndirectInviteParams = (authUrl: string) => {
  const queryParams: QueryParamsProps = { 'indirect-inv': 'true' };

  //authUrl can be an entire url, so we need to split and take only query params part
  const urlSplit = authUrl.split('?');
  const paramsString = urlSplit.length === 2 ? urlSplit[1] : authUrl;
  const urlParams = new URLSearchParams(paramsString);
  urlParams.forEach((value, key) => (queryParams[key] = value));

  return queryParams;
};

export const useAuthAppRedirect = (
  endpoint?: string,
  queryParams?: QueryParamsProps,
  language?: string
): boolean => {
  const { i18n } = useTranslation();

  const isAuthRedirectEnabled =
    process.env.REACT_APP_AUTH_REDIRECT_ENABLED === 'true';

  useEffect(() => {
    if (isAuthRedirectEnabled && process.env.REACT_APP_AUTH_URL) {
      const url = new URL(
        process.env.REACT_APP_AUTH_URL + getAuthAppEndpoint(language)
      );

      url.searchParams.append('redirect_app', 'candidate');
      if (queryParams) {
        Object.keys(queryParams).forEach(key => {
          url.searchParams.append(key, queryParams[key]);
        });
      }

      const authToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
      // If auth_token exists in localStorage it is valid, so pass it to
      // authentication app so it can be reused when using indirect-inv auto accept.
      if (authToken) {
        url.searchParams.append(AUTH_TOKEN_STORAGE_KEY, authToken);
      }
      window.location.replace(url);
    } else {
      console.error('Authentication App url is not set');
    }
    //eslint-disable-next-line
  }, []);

  const getAuthAppEndpoint = (language: string | undefined) => {
    return '/' + (language ?? i18n.language) + '/' + (endpoint ?? '');
  };

  //Needed to know if we should show Loader component until redirect happens
  return isAuthRedirectEnabled;
};
