import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  ClientDomainType,
  useAuthenticateMutation,
  useMfaAccessTokenMutation,
} from '../../../../../generated/graphql';
import LoginPresentational from '../../../components/organisms/Login/Login';
import {
  AUTH_TOKEN_STORAGE_KEY,
  MFA_AUTH_TOKEN,
  MFA_COOKIE,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import Error from '../../../enums/error';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';

interface ILogin {
  // Prepopulates input fields in login form.
  authPrepopulatedValues?: {
    email?: string;
    fullName?: string;
  };
  // Url where user will be redirected after successful login.
  authRedirectUrl: string;
  // Notification is visible if this prop is provided.
  loginNotification?: TNotification;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
  clearAuthViewNotifications: (view: AuthViews) => void;
  clientType?: string;
}

const Login: FC<ILogin> = ({
  authPrepopulatedValues = {},
  authRedirectUrl,
  loginNotification,
  addAuthNotification,
  clearAuthViewNotifications,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const mfaCookie: string[] = JSON.parse(
    localStorage.getItem(MFA_COOKIE) || '[]'
  );
  const [mfaAccessToken] = useMfaAccessTokenMutation({
    onCompleted(data) {
      localStorage.setItem(MFA_AUTH_TOKEN, data.mfaAccessToken.mfaAccessToken);
      history.push(authenticationRoutes.twoFactorAuthentication);
    },
  });
  const [authenticate] = useAuthenticateMutation({});

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    return () => {
      clearAuthViewNotifications(AuthViews.LOGIN);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (email: string, password: string) => {
    authenticate({
      variables: {
        email,
        password,
        mfaCookie,
      },
      onCompleted: data => {
        /**
         * User should be redirected to provided url after
         * successful login.
         */
        localStorage.setItem(
          AUTH_TOKEN_STORAGE_KEY,
          data.authenticate.accessToken
        );
        localStorage.setItem(
          REFRESH_TOKEN_STORAGE_KEY,
          data.authenticate.refreshToken
        );
        history.push(authRedirectUrl);
      },
      onError: props => {
        props.graphQLErrors.forEach(({ extensions }) => {
          if (extensions) {
            const { code, message } = extensions?.exception.response;
            if (code === Error.INVALID_CREDENTIALS) {
              /**
               * If invalid credentials provided, notification should be visible.
               */
              addAuthNotification(AuthViews.LOGIN, {
                icon: 'Warning',
                color: 'Purple',
                message: t(
                  'authentication.login.yourEmailOrPasswordDoNotMatch'
                ),
              });
            }
            if (code === Error.EXCEEDED_NUMBER_OF_ATTEMPTS) {
              const substr = message.substr(
                message.search('secondsLeft') + 13,
                message.length
              );
              const secondsLeft = Math.ceil(+substr);

              addAuthNotification(AuthViews.LOGIN, {
                icon: 'Warning',
                color: 'Purple',
                message: t(
                  'authentication.login.dueToMultipleFailedLoginAttempts',
                  { secondsLeft }
                ),
              });
            }
            if (code === Error.MFA_REQUIRED) {
              if (email && password) {
                mfaAccessToken({
                  variables: {
                    email: email,
                    password: password,
                    clientDomainType: ClientDomainType.CompanyAppDomain,
                  },
                });
              }
            }
          }
        });
      },
    });
  };
  return (
    <LoginPresentational
      email={authPrepopulatedValues.email}
      loginNotification={loginNotification}
      onSignIn={handleLogin}
      restorePasswordUrl={authenticationRoutes.restorePassword}
    />
  );
};

export default Login;
