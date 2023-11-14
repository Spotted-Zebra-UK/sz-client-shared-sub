import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ClientDomainType,
  useRequestPasswordRecoveryMutation,
} from '../../../../../generated/graphql';
import RestorePasswordPresentational from '../../../components/organisms/RestorePassword/RestorePassword';
import Error from '../../../enums/error';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import {
  useAuthAppRedirect,
  AUTH_APP_ROUTES,
} from '../../../hooks/useAuthAppRedirect';
import { Loader } from '@spotted-zebra-uk/sz-ui-shared.ui.loader';

interface IRestorePassword {
  restorePasswordNotification?: TNotification;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
  clientType?: string;
}

const RestorePassword: FC<IRestorePassword> = ({
  restorePasswordNotification,
  addAuthNotification,
  clientType,
}) => {
  const { t } = useTranslation();
  const loading = useAuthAppRedirect(AUTH_APP_ROUTES.RESET_PASSWORD);

  const [requestPasswordRecovery] = useRequestPasswordRecoveryMutation({
    onCompleted: () => {
      addAuthNotification(AuthViews.RESTORE_PASSWORD, {
        icon: 'Mail',
        color: 'Blue',
        message: t(
          'authentication.restorePassword.weWillAttemptToSendAPasswordResetLinkToYourEmail'
        ),
      });
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach(({ extensions }) => {
        const { code } = extensions?.exception.response;
        if (code === Error.INVALID_CREDENTIALS) {
          addAuthNotification(AuthViews.RESTORE_PASSWORD, {
            icon: 'Mail',
            color: 'Blue',
            message: t(
              'authentication.restorePassword.weWillAttemptToSendAPasswordResetLinkToYourEmail'
            ),
          });
        }
        if (code === Error.PASSWORD_TOO_WEAK) {
          // TODO: Maybe move the message to be a standalone note on screen when trying to create/change a password
          addAuthNotification(AuthViews.LOGIN, {
            icon: 'Idea',
            color: 'Purple',
            message: t('common.yourPasswordMustHave'),
          });
        }
      });
    },
  });
  const getClientDomainType = (): ClientDomainType => {
    if (clientType === 'candidate') return ClientDomainType.CandidateAppDomain;
    else if (clientType === 'company') return ClientDomainType.CompanyAppDomain;
    else if (clientType === 'admin') return ClientDomainType.AdminAppDomain;
    else return ClientDomainType.CandidateAppDomain;
  };
  const handleRestorePassword = (email: string) => {
    const clientDomainType = getClientDomainType();
    requestPasswordRecovery({ variables: { email, clientDomainType } });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <RestorePasswordPresentational
          notification={restorePasswordNotification}
          onRestorePassword={handleRestorePassword}
          loginRedirectUrl={authenticationRoutes.login}
        />
      )}
    </>
  );
};

export default RestorePassword;
