/* eslint-disable @typescript-eslint/indent */
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import SignUpPresentational from '../../../components/organisms/SignUp/SignUp';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import Error from '../../../enums/error';
import { REGISTER_ACCOUNT } from '../../../graphql/authentication';
import {
  IRegisterAccountInput,
  IRegisterAccountResponse,
} from '../../../interfaces/authentication';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';

interface ISignUp {
  authPrepopulatedValues: {
    email?: string;
    fullName?: string;
  };
  authRedirectUrl: string;
  directInvitationToken: string | undefined;
  signUpNotification: TNotification | undefined;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
}

const SignUp: FC<ISignUp> = ({
  authPrepopulatedValues,
  authRedirectUrl,
  directInvitationToken,
  signUpNotification,
  addAuthNotification,
}) => {
  const history = useHistory();
  const [registerAccount] = useMutation<
    IRegisterAccountResponse,
    IRegisterAccountInput
  >(REGISTER_ACCOUNT, {
    onCompleted(data) {
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
      graphQLErrors.forEach(({ message }) => {
        if (message === Error.EXISTING_ACCOUNT) {
          addAuthNotification(AuthViews.LOGIN, {
            icon: 'Idea',
            color: 'Green',
            message: 'Your account has already been created',
          });
          history.push(authenticationRoutes.login);
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
