import React, { FC } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import CreatePasswordPresentational from '../../../components/organisms/CreatePassword/CreatePassword';
import Error from '../../../enums/error';
import { UPDATE_IDENTITY_PASSWORD_MUTATION } from '../../../graphql/authentication';
import { parseRecoveryToken } from '../../../helpers/passwordRecovery';
import { IUpdateIdentityPassword } from '../../../interfaces/authentication';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import './CreatePassword.scss';

interface ICreatePassword {
  createPasswordNotification?: TNotification;
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
              message: (
                <span className="CreatePassword__ErrorNotificationMessage">
                  The recovery link is invalid. You must use the link you have
                  been sent within 1 hour. Please reset your password again by
                  going{' '}
                  <Link to={authenticationRoutes.restorePassword}>here</Link>.
                </span>
              ),
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
