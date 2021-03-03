import React, { FC } from 'react';
/* eslint-disable @typescript-eslint/indent */
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
        message: 'We will send you an email with a link for reset password',
      });
    },
    onError: props => {
      props.graphQLErrors.forEach(({ message }) => {
        if (message === Error.EMAIL_NOT_FOUND) {
          addAuthNotification(AuthViews.RESTORE_PASSWORD, {
            icon: 'Claps',
            color: 'Purple',
            message: 'Email does not exist',
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
