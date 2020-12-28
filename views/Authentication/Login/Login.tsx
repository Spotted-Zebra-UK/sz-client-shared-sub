import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { TNotification } from '../../../../../interfaces/notification';
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
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';

interface ILogin {
  authPrepopulatedValues: {
    email?: string;
    fullName?: string;
  };
  authRedirectUrl: string;
  loginNotification: TNotification | undefined;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
  clearAuthViewNotifications: (view: AuthViews) => void;
}

const Login: FC<ILogin> = ({
  authPrepopulatedValues,
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
        props.graphQLErrors.forEach(({ message }) => {
          if (message === Error.INVALID_CREDENTIALS) {
            addAuthNotification(AuthViews.LOGIN, {
              icon: 'Warning',
              color: 'Purple',
              message: 'Incorrect email or password',
            });
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
