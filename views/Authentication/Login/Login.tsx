import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import LoginPresentational from '../../../components/organisms/Login/Login';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import Error from '../../../enums/error';
import { AUTHENTICATE_MUTATION } from '../../../graphql/authentication';
import {
  IAuthenticateInput,
  IAuthenticateResponse,
} from '../../../interfaces/authentication';
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
  loginNotification?: TNotification | undefined;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
  clearAuthViewNotifications: (view: AuthViews) => void;
}

const Login: FC<ILogin> = ({
  authPrepopulatedValues = {},
  authRedirectUrl,
  loginNotification,
  addAuthNotification,
  clearAuthViewNotifications,
}) => {
  const history = useHistory();
  const [authenticate] = useMutation<IAuthenticateResponse, IAuthenticateInput>(
    AUTHENTICATE_MUTATION,
    {
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
                message:
                  'Your email or password do not match, please try again or reset your password using the link below',
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
                message: `Due to multiple failed login attempts, please wait ${secondsLeft} seconds before trying again `,
              });
            }
          }
        });
      },
    }
  );

  useEffect(() => {
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
