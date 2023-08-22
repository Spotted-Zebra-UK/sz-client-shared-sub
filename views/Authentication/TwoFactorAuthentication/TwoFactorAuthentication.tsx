import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  TNotification,
  useNotification,
} from '@spotted-zebra-uk/sz-ui-shared.ui.notification';
import {
  useMfaAuthenticateMutation,
  useRequestMfaCodeMutation,
} from '../../../../../generated/graphql';
import TwoFactorAuthenticationPresentational from '../../../components/organisms/TwoFactorAuthentication/TwoFactorAuthentication';
import {
  AUTH_TOKEN_STORAGE_KEY,
  MFA_AUTH_TOKEN,
  MFA_COOKIE,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import Error from '../../../enums/error';
import { TNotification as INotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import { HelmetAndPageAnnouncer } from 'components/organisms/HelmetAndPageAnnouncer/HelmetAndPageAnnouncer';

interface ITwoFactorAuthentication {
  // Url where user will be redirected after successful login.
  authRedirectUrl: string;
  // Notification is visible if this prop is provided.
  loginNotification?: INotification | undefined;
  addAuthNotification: (view: AuthViews, notification: INotification) => void;
  clearAuthViewNotifications: (view: AuthViews) => void;
}

const TwoFactorAuthentication: FC<ITwoFactorAuthentication> = ({
  authRedirectUrl,
  loginNotification,
  addAuthNotification,
  clearAuthViewNotifications,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { handleMsgType } = useNotification();
  const mfaAccessToken = localStorage.getItem(MFA_AUTH_TOKEN);
  const [mfaAuthenticate] = useMfaAuthenticateMutation({
    onCompleted(data) {
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
          const code = extensions?.exception?.response?.code;
          const message = extensions?.exception?.response?.message;

          if (code === Error.INVALID_MFA_CODE) {
            return handleMsgType({
              type: TNotification.error,
              message: `${t(
                'authentication.twoFactorAuthentication.providedInvalidCode'
              )}`,
            });
          }

          if (code === Error.EXPIRED_MFA_TOKEN) {
            handleMsgType({
              type: TNotification.error,
              message: `${t(
                'authentication.twoFactorAuthentication.sessionExpired'
              )}`,
            });
            return history.push(authenticationRoutes.login);
          }

          if (code === Error.EXCEEDED_NUMBER_OF_ATTEMPTS) {
            const substr = message.substr(
              message.search('secondsLeft') + 13,
              message.length
            );
            const secondsLeft = Math.ceil(+substr);
            return handleMsgType({
              type: TNotification.error,
              message: t(
                'authentication.login.dueToMultipleFailedLoginAttempts',
                { secondsLeft }
              ),
            });
          }

          return handleMsgType({
            type: TNotification.error,
            message: `${t(
              'authentication.twoFactorAuthentication.generalError'
            )}`,
          });
        }
      });
    },
  });
  const [requestMfaCode] = useRequestMfaCodeMutation({
    // TODO: Fix localization [EN-1930] And add proper error handling.
    onError: () => {
      return handleMsgType({
        type: TNotification.error,
        message: `${t('authentication.twoFactorAuthentication.generalError')}`,
      });
    },
  });

  useEffect(() => {
    return () => {
      clearAuthViewNotifications(AuthViews.TWO_FACTOR_AUTHENTICATION);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (mfaCode: string) => {
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
    <>
      <HelmetAndPageAnnouncer
        pageTitle={t('authentication.twoFactorAuthentication.title')}
      />
      <TwoFactorAuthenticationPresentational
        onSubmit={handleSubmit}
        requestMfaCode={handleRequestMfaCode}
      />
    </>
  );
};

export default TwoFactorAuthentication;
