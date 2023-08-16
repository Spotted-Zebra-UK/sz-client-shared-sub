import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TNotification as INotification,
  useNotification,
} from '@spotted-zebra-uk/sz-ui-shared.ui.notification';
import {
  ClientDomainType,
  useRequestPasswordRecoveryMutation,
} from '../../../../../generated/graphql';
import RestorePasswordPresentational from '../../../components/organisms/RestorePassword/RestorePassword';
import Error from '../../../enums/error';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';

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
  const { handleMsgType } = useNotification();

  const [requestPasswordRecovery] = useRequestPasswordRecoveryMutation({
    onCompleted: () => {
      handleMsgType({
        type: INotification.success,
        message: t(
          'authentication.restorePassword.weWillAttemptToSendAPasswordResetLinkToYourEmail'
        ),
      });
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach(({ extensions }) => {
        const { code } = extensions?.exception.response;
        if (code === Error.INVALID_CREDENTIALS) {
          handleMsgType({
            type: INotification.error,
            message: t(
              'authentication.restorePassword.weWillAttemptToSendAPasswordResetLinkToYourEmail'
            ),
          });
        }
        if (code === Error.PASSWORD_TOO_WEAK) {
          // TODO: Maybe move the message to be a standalone note on screen when trying to create/change a password
          handleMsgType({
            type: INotification.error,
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
    <RestorePasswordPresentational
      notification={restorePasswordNotification}
      onRestorePassword={handleRestorePassword}
      loginRedirectUrl={authenticationRoutes.login}
    />
  );
};

export default RestorePassword;
