import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getLanguageFromShortName } from '../../../../../constants/languages';
import { useRegisterAccountMutation } from '../../../../../generated/graphql';
import SignUpPresentational from '../../../components/organisms/SignUp/SignUp';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import Error from '../../../enums/error';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import { ISignUpWrapper } from './SignUpWrapper/SignUpWrapper';

interface ISignUp extends ISignUpWrapper {
  companyId?: number;
}

const SignUp: FC<ISignUp> = ({
  authPrepopulatedValues = {},
  authRedirectUrl,
  directInvitationToken,
  signUpNotification,
  addAuthNotification,
  companyId,
}) => {
  const { i18n, t } = useTranslation();
  const history = useHistory();

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
        if (extensions) {
          const { code } = extensions.exception.response;
          /**
           * If account with provided email already exists, app should be redirected to login view and notification should be visible.
           */
          if (code === Error.EXISTING_ACCOUNT) {
            addAuthNotification(AuthViews.LOGIN, {
              icon: 'Idea',
              color: 'Purple',
              message: t(
                'authentication.signUp.yourAccountHasAlreadyBeenCreated'
              ),
            });
            history.push(authenticationRoutes.login);
          }
          if (code === Error.PASSWORD_TOO_WEAK) {
            // TODO: Maybe move the message to be a standalone note on screen when trying to create/change a password
            addAuthNotification(AuthViews.SIGN_UP, {
              icon: 'Idea',
              color: 'Purple',
              message: t('common.yourPasswordMustHave'),
            });
          }
        }
      });
    },
  });

  const handleSignUp = (
    fullName: string,
    email: string,
    password: string,
    isPrivacyPolicyChecked: boolean
  ) => {
    const [firstName, lastName] = fullName.split(' ', 2);
    registerAccount({
      variables: {
        firstName,
        lastName,
        email,
        password,
        invitationToken: directInvitationToken,
        language: getLanguageFromShortName(i18n.language),
        companyId,
      },
    });
  };

  return (
    <SignUpPresentational
      fullName={authPrepopulatedValues.fullName}
      email={authPrepopulatedValues.email}
      onSignUp={handleSignUp}
      notification={signUpNotification}
      loginRedirectUrl={authenticationRoutes.login}
    />
  );
};

export default SignUp;
