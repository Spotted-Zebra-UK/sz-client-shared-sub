import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TNotification } from '../../../../../interfaces/notification';
import { AuthViews } from '../../../views/Authentication/Authentication.constants';
import CreatePassword from '../../../views/Authentication/CreatePassword/CreatePassword';
import DirectInvitation from '../../../views/Authentication/DirectInvitation/DirectInvitation';
import Login from '../../../views/Authentication/Login/Login';
import RestorePassword from '../../../views/Authentication/RestorePassword/RestorePassword';
import SignUp from '../../../views/Authentication/SignUp/SignUp';
import { authenticationRoutes } from '../authNavigation.constants';

interface IAuthSwitch {
  authRedirectUrl: string;
  authPrepopulatedValues: {
    email?: string;
    fullName?: string;
  };
  directInvitationToken: string | undefined;
  authNotifications: { [key in AuthViews]: TNotification | undefined };
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
  clearAuthViewNotifications: (view: AuthViews) => void;
  setAuthPrepopulatedValues: (fullName: string, email: string) => void;
  setDirectInvitationToken: (token: string | undefined) => void;
}

const AuthSwitch: FC<IAuthSwitch> = ({
  authRedirectUrl,
  authPrepopulatedValues,
  authNotifications,
  directInvitationToken,
  addAuthNotification,
  clearAuthViewNotifications,
  setAuthPrepopulatedValues,
  setDirectInvitationToken,
}) => {
  return (
    <Switch>
      <Route path={authenticationRoutes.directInvitation}>
        <DirectInvitation
          addAuthNotification={addAuthNotification}
          setAuthPrepopulatedValues={setAuthPrepopulatedValues}
          setDirectInvitationToken={setDirectInvitationToken}
        />
      </Route>
      <Route path={authenticationRoutes.login}>
        <Login
          authPrepopulatedValues={authPrepopulatedValues}
          authRedirectUrl={authRedirectUrl}
          loginNotification={authNotifications[AuthViews.LOGIN]}
          addAuthNotification={addAuthNotification}
          clearAuthViewNotifications={clearAuthViewNotifications}
        />
      </Route>
      <Route path={authenticationRoutes.signUp}>
        <SignUp
          authPrepopulatedValues={authPrepopulatedValues}
          authRedirectUrl={authRedirectUrl}
          signUpNotification={authNotifications[AuthViews.SIGN_UP]}
          directInvitationToken={directInvitationToken}
          addAuthNotification={addAuthNotification}
        />
      </Route>
      <Route path={authenticationRoutes.restorePassword}>
        <RestorePassword
          restorePasswordNotification={
            authNotifications[AuthViews.RESTORE_PASSWORD]
          }
          addAuthNotification={addAuthNotification}
        />
      </Route>
      <Route path={authenticationRoutes.createPassword}>
        <CreatePassword
          createPasswordNotification={
            authNotifications[AuthViews.CREATE_PASSWORD]
          }
          addAuthNotification={addAuthNotification}
        />
      </Route>
      <Redirect
        from={authenticationRoutes.base}
        to={authenticationRoutes.login}
      />
    </Switch>
  );
};

export default AuthSwitch;
