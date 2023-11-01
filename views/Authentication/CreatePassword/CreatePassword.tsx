import './CreatePassword.scss';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import {
  TNotification as INotification,
  useNotification,
} from '@spotted-zebra-uk/sz-ui-shared.ui.notification';
import { useUpdateIdentityPasswordMutation } from '../../../../../generated/graphql';
import CreatePasswordPresentational from '../../../components/organisms/CreatePassword/CreatePassword';
import Error from '../../../enums/error';
import { parseRecoveryToken } from '../../../helpers/passwordRecovery';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import {
  AUTH_APP_ROUTES,
  useAuthAppRedirect,
} from '../../../hooks/useAuthAppRedirect';
import { Loader } from '@spotted-zebra-uk/sz-ui-shared.ui.loader';

interface ICreatePassword {
  createPasswordNotification?: TNotification;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
}

const CreatePassword: FC<ICreatePassword> = ({
  createPasswordNotification,
  addAuthNotification,
}) => {
  const { t, i18n } = useTranslation();
  const { handleMsgType } = useNotification();

  const history = useHistory();
  const location = useLocation();
  const parsedRecoveryTokenData = parseRecoveryToken(location.search);

  useEffect(() => {
    if (parsedRecoveryTokenData?.language) {
      i18n.changeLanguage(parsedRecoveryTokenData.language);
    }
  }, [i18n, parsedRecoveryTokenData]);

  const loading = useAuthAppRedirect(
    AUTH_APP_ROUTES.SET_NEW_PASSWORD,
    {
      token: parsedRecoveryTokenData?.token || '',
    },
    parsedRecoveryTokenData?.language
  );

  const [resetPassword] = useUpdateIdentityPasswordMutation({
    onCompleted: () => {
      handleMsgType({
        type: INotification.success,
        title: t(
          'authentication.createPassword.yourPasswordWasSuccessFullyChanged'
        ),
      });
      history.push(authenticationRoutes.login);
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach(({ message }) => {
        if (message === Error.RECOVERY_TOKEN_EXPIRED_OR_INVALID) {
          handleMsgType({
            type: INotification.error,
            title: t('authentication.createPassword.expiredRecoveryLink'),
            message: t('authentication.createPassword.recoveryLinkIsInvalid'),
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
    <>
      {loading ? (
        <Loader variant="bubbles" isPageLoader />
      ) : (
        <CreatePasswordPresentational
          notification={createPasswordNotification}
          onCreatePassword={handleCreatePassword}
          loginRedirectUrl={authenticationRoutes.login}
        />
      )}
    </>
  );
};

export default CreatePassword;
