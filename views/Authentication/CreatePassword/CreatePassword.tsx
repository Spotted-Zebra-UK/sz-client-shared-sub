import './CreatePassword.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useUpdateIdentityPasswordMutation } from '../../../../../generated/graphql';
import CreatePasswordPresentational from '../../../components/organisms/CreatePassword/CreatePassword';
import Error from '../../../enums/error';
import { parseRecoveryToken } from '../../../helpers/passwordRecovery';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';

interface ICreatePassword {
  createPasswordNotification?: TNotification;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
}

const CreatePassword: FC<ICreatePassword> = ({
  createPasswordNotification,
  addAuthNotification,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const parsedRecoveryTokenData = parseRecoveryToken(location.search);

  const [resetPassword] = useUpdateIdentityPasswordMutation({
    onCompleted: () => {
      addAuthNotification(AuthViews.LOGIN, {
        icon: 'Claps',
        color: 'Blue',
        message: t(
          'authentication.createPassword.yourPasswordWasSuccessFullyChanged'
        ),
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
                {t('authentication.createPassword.recoveryLinkIsInvalid')}{' '}
                <Link to={authenticationRoutes.restorePassword}>
                  {t('common.here')}
                </Link>
                .
              </span>
            ),
          });
        }
      });
    },
  });

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
