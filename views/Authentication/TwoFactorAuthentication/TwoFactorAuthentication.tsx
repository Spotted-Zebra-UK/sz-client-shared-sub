import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TwoFactorAuthenticationPresentational from '../../../components/organisms/TwoFactorAuthentication/TwoFactorAuthentication';
import {
  AUTH_TOKEN_STORAGE_KEY,
  MFA_AUTH_TOKEN,
  MFA_COOKIE,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import {
  MFA_AUTHENTICATE,
  MFA_REQUEST_CODE,
} from '../../../graphql/authentication';
import {
  IMfaAuthenticateInput,
  IMfaAuthenticateResponse,
  IMfaRequestCodeInput,
} from '../../../interfaces/authentication';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import Error from '../../../enums/error';

interface ITwoFactorAuthentication {
  // Url where user will be redirected after successful login.
  authRedirectUrl: string;
  // Notification is visible if this prop is provided.
  loginNotification?: TNotification | undefined;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
  clearAuthViewNotifications: (view: AuthViews) => void;
}

const TwoFactorAuthentication: FC<ITwoFactorAuthentication> = ({
  authRedirectUrl,
  loginNotification,
  addAuthNotification,
  clearAuthViewNotifications,
}) => {
  const history = useHistory();
  const mfaAccessToken = localStorage.getItem(MFA_AUTH_TOKEN);
  const [mfaAuthenticate] = useMutation<
    IMfaAuthenticateResponse,
    IMfaAuthenticateInput
  >(MFA_AUTHENTICATE, {
    onCompleted: data => {
      if (data?.mfaAuthenticate && data.mfaAuthenticate.accessToken) {
        localStorage.setItem(
          AUTH_TOKEN_STORAGE_KEY,
          data.mfaAuthenticate.accessToken
        );

        localStorage.setItem(
          REFRESH_TOKEN_STORAGE_KEY,
          data.mfaAuthenticate.refreshToken
        );

        localStorage.setItem(
          MFA_COOKIE,
          JSON.stringify(data.mfaAuthenticate.mfaCookie)
        );

        history.push(authRedirectUrl);
      }
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions) {
          const { code } = extensions.exception.response;

          if (code === Error.INVALID_MFA_CODE) {
            addAuthNotification(AuthViews.TWO_FACTOR_AUTHENTICATION, {
              icon: 'Warning',
              color: 'Purple',
              message: 'Invalid 6 digit code.',
            });
          }

          if (code === Error.EXPIRED_MFA_TOKEN) {
            addAuthNotification(AuthViews.LOGIN, {
              icon: 'Warning',
              color: 'Purple',
              message: 'Session expired. Please re-enter your credentials',
            });
            history.push(authenticationRoutes.login);
          }
        }
      });
    },
  });
  const [requestMfaCode] = useMutation<IMfaRequestCodeInput>(
    MFA_REQUEST_CODE,
    {}
  );

  useEffect(() => {
    return () => {
      clearAuthViewNotifications(AuthViews.TWO_FACTOR_AUTHENTICATION);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (mfaCode: number) => {
    if (!mfaAccessToken) history.push(authenticationRoutes.login);
    mfaAuthenticate({
      variables: {
        mfaAccessToken: mfaAccessToken ? mfaAccessToken : '',
        mfaCode,
      },
    });
  };

  const handleRequestMfaCode = () => {
    requestMfaCode({
      variables: {
        mfaAccessToken: mfaAccessToken ? mfaAccessToken : '',
      },
    });
  };
  return (
    <TwoFactorAuthenticationPresentational
      loginNotification={loginNotification}
      onSubmit={handleSubmit}
      requestMfaCode={handleRequestMfaCode}
    />
  );
};

export default TwoFactorAuthentication;
