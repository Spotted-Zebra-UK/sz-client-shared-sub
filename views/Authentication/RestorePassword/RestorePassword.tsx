import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TNotification as INotification,
  useNotification,
} from '@spotted-zebra-uk/sz-ui-shared.ui.notification';
import {
  ClientDomainType,
  Language,
  useRequestPasswordRecoveryMutation,
} from '../../../../../generated/graphql';
import RestorePasswordPresentational from '../../../components/organisms/RestorePassword/RestorePassword';
import Error from '../../../enums/error';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import { HelmetAndPageAnnouncer } from 'components/organisms/HelmetAndPageAnnouncer/HelmetAndPageAnnouncer';

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
  const { t, i18n } = useTranslation();
  const { handleMsgType } = useNotification();

  const [requestPasswordRecovery] = useRequestPasswordRecoveryMutation({
    onCompleted: () => {
      handleMsgType({
        type: INotification.success,
        title: t('authentication.restorePassword.success'),
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
            title: t('authentication.restorePassword.failed'),
            message: t(
              'authentication.restorePassword.weWillAttemptToSendAPasswordResetLinkToYourEmail'
            ),
          });
        }
        if (code === Error.PASSWORD_TOO_WEAK) {
          // TODO: Maybe move the message to be a standalone note on screen when trying to create/change a password
          handleMsgType({
            type: INotification.error,
            title: t('authentication.restorePassword.failed'),
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
  /**
   * Can add more languages if required
   */
  const i18ToLanguage = (language: string) => {
    switch (language) {
      case 'de':
        return Language.German;
      case 'es':
        return Language.SpanishCastilian;
      case 'in':
        return Language.Indonesian;
      case 'fr':
        return Language.French;
      case 'tr':
        return Language.Turkish;
      default:
        return null;
    }
  };

  const handleRestorePassword = (email: string) => {
    const clientDomainType = getClientDomainType();
    requestPasswordRecovery({
      variables: {
        email,
        clientDomainType,
        language: i18ToLanguage(i18n.language),
      },
    });
  };

  return (
    <>
      <HelmetAndPageAnnouncer
        pageTitle={t('authentication.restorePassword.title')}
      />
      <RestorePasswordPresentational
        notification={restorePasswordNotification}
        onRestorePassword={handleRestorePassword}
        loginRedirectUrl={authenticationRoutes.login}
      />
    </>
  );
};

export default RestorePassword;
