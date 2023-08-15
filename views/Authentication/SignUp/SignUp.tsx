import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  TNotification,
  useNotification,
} from '@spotted-zebra-uk/sz-ui-shared.ui.notification';
import { getLanguageFromShortName } from '../../../../../constants/languages';
import { useRegisterAccountMutation } from '../../../../../generated/graphql';
import SignUpPresentational from '../../../components/organisms/SignUp/SignUp';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import Error from '../../../enums/error';
import { formatFullName } from '../../../helpers/fullName';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { ISignUpWrapper } from './SignUpWrapper/SignUpWrapper';

interface ISignUp extends ISignUpWrapper {
  companyId?: number;
  projectId?: number;
}

const SignUp: FC<ISignUp> = ({
  authPrepopulatedValues = {},
  authRedirectUrl,
  directInvitationToken,
  companyId,
  projectId,
}) => {
  const { i18n, t } = useTranslation();
  const history = useHistory();
  const { handleMsgType } = useNotification();

  const [registerAccount] = useRegisterAccountMutation({
    onCompleted(data) {
      /**
       * User should be redirected to provided url after
       * successful sign up.
       */
      if (data?.registerAccount && data.registerAccount.accessToken) {
        localStorage.setItem(
          AUTH_TOKEN_STORAGE_KEY,
          data.registerAccount.accessToken
        );
        localStorage.setItem(
          REFRESH_TOKEN_STORAGE_KEY,
          data.registerAccount.refreshToken
        );
        history.push(authRedirectUrl);
      }
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach(({ extensions }) => {
        const code = extensions?.exception?.response?.code;
        /**
         * If account with provided email already exists, app should be redirected to login view and notification should be visible.
         */
        if (code === Error.EXISTING_ACCOUNT) {
          handleMsgType({
            type: TNotification.error,
            message: `${t(
              'authentication.signUp.yourAccountHasAlreadyBeenCreated'
            )}`,
          });
          return history.push(authenticationRoutes.login);
        }
        if (code === Error.PASSWORD_TOO_WEAK) {
          // TODO: Maybe move the message to be a standalone note on screen when trying to create/change a password
          return handleMsgType({
            type: TNotification.error,
            message: `${t('common.yourPasswordMustHave')}`,
          });
        }

        return handleMsgType({
          type: TNotification.error,
          message: `${t('authentication.signUp.accountCreationError')}`,
        });
      });
    },
  });

  const handleSignUp = (fullName: string, email: string, password: string) => {
    // trim prevent wrong separation on multiple spaces
    const [firstName, lastName] = formatFullName(fullName).split(' ', 2);

    registerAccount({
      variables: {
        firstName,
        lastName,
        email,
        password,
        invitationToken: directInvitationToken,
        language: getLanguageFromShortName(i18n.language),
        companyId,
        projectId,
      },
    });
  };

  return (
    <SignUpPresentational
      fullName={authPrepopulatedValues.fullName}
      email={authPrepopulatedValues.email}
      onSignUp={handleSignUp}
      loginRedirectUrl={authenticationRoutes.login}
    />
  );
};

export default SignUp;
