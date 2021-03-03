/* eslint-disable @typescript-eslint/indent */
import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import SignUpPresentational from '../../../components/organisms/SignUp/SignUp';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import Error from '../../../enums/error';
import { REGISTER_ACCOUNT } from '../../../graphql/authentication';
import { isWiserCompany } from '../../../helpers/invitations';
import {
  IRegisterAccountInput,
  IRegisterAccountResponse,
} from '../../../interfaces/authentication';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import googleSpreadsheet from '../../../services/googleSpreadsheet';
import { AuthViews } from '../Authentication.constants';

interface ISignUp {
  authPrepopulatedValues?: {
    email?: string;
    fullName?: string;
  };
  authRedirectUrl: string;
  directInvitationToken: string | undefined;
  signUpNotification?: TNotification | undefined;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
}

const SignUp: FC<ISignUp> = ({
  authPrepopulatedValues = {},
  authRedirectUrl,
  directInvitationToken,
  signUpNotification,
  addAuthNotification,
}) => {
  const isWiser = useMemo(
    () => isWiserCompany(window.location + authRedirectUrl),
    [authRedirectUrl]
  );

  const history = useHistory();
  const [registerAccount] = useMutation<
    IRegisterAccountResponse,
    IRegisterAccountInput
  >(REGISTER_ACCOUNT, {
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
      graphQLErrors.forEach(({ message }) => {
        /**
         * If account with provided email already exists, app should be redirected to login view and notification should be visible.
         */
        if (message === Error.EXISTING_ACCOUNT) {
          addAuthNotification(AuthViews.LOGIN, {
            icon: 'Idea',
            color: 'Purple',
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
    appliedFrom: string,
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

    /**
     * Email and additional information should be added to google spreadsheet
     * for candidates which invited to wiser company assessment.
     *
     * TODO: Delete when Candidate Information feature implemented.
     */
    if (isWiser) {
      googleSpreadsheet.addRow({
        Email: email,
        AppliedFrom: appliedFrom,
      });
    }
  };

  return (
    <SignUpPresentational
      fullName={authPrepopulatedValues.fullName}
      email={authPrepopulatedValues.email}
      onSignUp={handleSignUp}
      notification={signUpNotification}
      loginRedirectUrl={authenticationRoutes.login}
      hasAppliedFromField={isWiser}
    />
  );
};

export default SignUp;
