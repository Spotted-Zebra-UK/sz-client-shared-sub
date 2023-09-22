import React, { FC, useRef, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants/authentication';
import { TNotification } from '../../interfaces/notification';
import { authenticationRoutes } from '../../navigation/AuthNavigation/authNavigation.constants';
import AuthSwitch from '../../navigation/AuthNavigation/AuthSwitch/AuthSwitch';
import { IPrivateRouteRedirectLocationState } from '../../navigation/PrivateRoute/PrivateRoute';
import { AuthViews } from './Authentication.constants';

interface IAuthentication {
  defaultRedirectUrl?: string;
  clientType?: string;
}

interface IAuthPrepouplatedValues {
  email?: string;
  fullName?: string;
}

const initializeAuthNotifications: {
  [key in AuthViews]: TNotification | undefined;
} = {
  [AuthViews.LOGIN]: undefined,
  [AuthViews.SIGN_UP]: undefined,
  [AuthViews.CREATE_PASSWORD]: undefined,
  [AuthViews.RESTORE_PASSWORD]: undefined,
  [AuthViews.TWO_FACTOR_AUTHENTICATION]: undefined,
};

const Authentication: FC<IAuthentication> = ({
  defaultRedirectUrl = authenticationRoutes.defaultAuthRedirectUrl,
  clientType,
}) => {
  const { state } = useLocation<
    IPrivateRouteRedirectLocationState | undefined
  >();

  const authRedirectUrl = useRef(
    state?.from && state.from.pathname
      ? `${state.from.pathname}${state.from.search || ''}`
      : defaultRedirectUrl
  );

  const [authPrepopulatedValues, setAuthPrepopulatedValues] =
    useState<IAuthPrepouplatedValues>({
      fullName: '',
      email: '',
    });
  const [authNotifications, setAuthNotifications] = useState(
    initializeAuthNotifications
  );
  const [directInvitationToken, setDirectInvitationToken] = useState<
    string | undefined
  >();

  const handleAddAuthNotification = (
    view: AuthViews,
    notification: TNotification
  ) => {
    setAuthNotifications(prevNotifications => ({
      ...prevNotifications,
      [view]: notification,
    }));
  };

  const handleClearAuthViewNotifications = (view: AuthViews) => {
    setAuthNotifications(prevNotifications => ({
      ...prevNotifications,
      [view]: undefined,
    }));
  };

  const handleSetAuthPrepopulatedValues = (fullName: string, email: string) => {
    setAuthPrepopulatedValues({ fullName, email });
  };

  const handleSetDirectInvitationToken = (token: string | undefined) => {
    setDirectInvitationToken(token);
  };

  const accessToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (accessToken) {
    return <Redirect to={defaultRedirectUrl} />;
  }

  return (
    <AuthSwitch
      authPrepopulatedValues={authPrepopulatedValues}
      authRedirectUrl={authRedirectUrl.current}
      authNotifications={authNotifications}
      directInvitationToken={directInvitationToken}
      setAuthPrepopulatedValues={handleSetAuthPrepopulatedValues}
      addAuthNotification={handleAddAuthNotification}
      clearAuthViewNotifications={handleClearAuthViewNotifications}
      setDirectInvitationToken={handleSetDirectInvitationToken}
      clientType={clientType}
    />
  );
};

export default Authentication;
