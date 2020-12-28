import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import CreatePasswordPresentational from '../../../components/organisms/CreatePassword/CreatePassword';
import Error from '../../../enums/error';
import { UPDATE_IDENTITY_PASSWORD_MUTATION } from '../../../graphql/authentication';
import { parseRecoveryToken } from '../../../helpers/passwordRecovery';
import { IUpdateIdentityPassword } from '../../../interfaces/authentication';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';

interface ICreatePassword {
  createPasswordNotification: TNotification | undefined;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
}

const CreatePassword: FC<ICreatePassword> = ({
  createPasswordNotification,
  addAuthNotification,
}) => {
  const history = useHistory();
  const location = useLocation();
  const parsedRecoveryTokenData = parseRecoveryToken(location.search);
  const [resetPassword] = useMutation<{}, IUpdateIdentityPassword>(
    UPDATE_IDENTITY_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        addAuthNotification(AuthViews.LOGIN, {
          icon: 'Claps',
          color: 'Blue',
          message: 'Your password was successfully changed',
        });
        history.push(authenticationRoutes.login);
      },
      onError: ({ graphQLErrors }) => {
        graphQLErrors.forEach(({ message }) => {
          if (message === Error.RECOVERY_TOKEN_EXPIRED_OR_INVALID) {
            addAuthNotification(AuthViews.CREATE_PASSWORD, {
              icon: 'Claps',
              color: 'Purple',
              message: 'Recovery token is invalid or has been expired',
            });
          }
        });
      },
    }
  );

  const handleCreatePassword = (password: string) => {
    if (parsedRecoveryTokenData && parsedRecoveryTokenData.token) {
      resetPassword({
        variables: {
          recoveryToken: parsedRecoveryTokenData.token,
          newPassword: password,
        },
      });
    }
  };

  return (
    <CreatePasswordPresentational
      notification={createPasswordNotification}
      onCreatePassword={handleCreatePassword}
      loginRedirectUrl={authenticationRoutes.login}
    />
  );
};

export default CreatePassword;
