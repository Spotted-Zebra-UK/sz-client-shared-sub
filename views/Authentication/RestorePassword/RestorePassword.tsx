import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import RestorePasswordPresentational from '../../../components/organisms/RestorePassword/RestorePassword';
import Error from '../../../enums/error';
import { REQUEST_PASSWORD_RECOVERY_MUTATION } from '../../../graphql/authentication';
import { IRequestPasswordRecoveryInput } from '../../../interfaces/authentication';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';

interface IRestorePassword {
  restorePasswordNotification?: TNotification;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
}

const RestorePassword: FC<IRestorePassword> = ({
  restorePasswordNotification,
  addAuthNotification,
}) => {
  const [requestPasswordRecovery] = useMutation<
    {},
    IRequestPasswordRecoveryInput
  >(REQUEST_PASSWORD_RECOVERY_MUTATION, {
    onCompleted: () => {
      addAuthNotification(AuthViews.RESTORE_PASSWORD, {
        icon: 'Mail',
        color: 'Blue',
        message:
          'We will attempt to send a password reset link to your e-mail address.  If the e-mail is not registered, a reset link will not have been sent.',
      });
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach(({ extensions }) => {
        const { code } = extensions?.exception.response;
        if (code === Error.INVALID_CREDENTIALS) {
          addAuthNotification(AuthViews.RESTORE_PASSWORD, {
            icon: 'Mail',
            color: 'Blue',
            message:
              'We will attempt to send a password reset link to your e-mail address.  If the e-mail is not registered, a reset link will not have been sent.',
          });
        }
        if (code === Error.PASSWORD_TOO_WEAK) {
          // TODO: Maybe move the message to be a standalone note on screen when trying to create/change a password
          addAuthNotification(AuthViews.LOGIN, {
            icon: 'Idea',
            color: 'Purple',
            message:
              'Your password must have at least 1 uppercase letter, 1 lowercase letter, 1 number or special character and be at least 8 characters long.',
          });
        }
      });
    },
  });

  const handleRestorePassword = (email: string) => {
    requestPasswordRecovery({ variables: { email } });
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
