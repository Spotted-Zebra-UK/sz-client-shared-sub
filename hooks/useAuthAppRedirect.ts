import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export enum AUTH_APP_ROUTES {
  RESET_PASSWORD = 'reset-password',
  SET_NEW_PASSWORD = 'set-new-password',
  DIRECT_INVITE = 'inv',
}

type QueryParamsProps = {
  [key: string]: string;
};

export const useAuthAppRedirect = (
  endpoint?: string,
  queryParams?: QueryParamsProps
): boolean => {
  const { i18n } = useTranslation();

  const isAuthRedirectEnabled = process.env.REACT_APP_AUTH_REDIRECT_ENABLED === 'true';

  useEffect(() => {
    if (isAuthRedirectEnabled && process.env.REACT_APP_AUTH_URL) {
      const url = new URL(
        process.env.REACT_APP_AUTH_URL + getAuthAppEndpoint()
      );

      url.searchParams.append('redirect_app', "company");
      if (queryParams) {
        Object.keys(queryParams).forEach(key => {
          url.searchParams.append(key, queryParams[key]);
        });
      }
      window.location.replace(url);
    } else {
      console.error('Authentication App url is not set');
    }
    //eslint-disable-next-line
  }, []);

  const getAuthAppEndpoint = () => {
    return i18n.language + '/' + (endpoint ?? '');
  };

  //Needed to know if we should show Loader component until redirect happens
  return isAuthRedirectEnabled;
};
