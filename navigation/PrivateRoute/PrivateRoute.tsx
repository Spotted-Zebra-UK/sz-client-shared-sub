import React, { FunctionComponent } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants/authentication';

interface IPrivateRoute extends RouteProps {
  component: FunctionComponent<RouteComponentProps>;
  redirectUrl?: string;
}

export interface IPrivateRouteRedirectLocationState {
  from: Location;
}

const PrivateRoute: FunctionComponent<IPrivateRoute> = ({
  component: Component,
  redirectUrl = '/auth',
  ...rest
}) => {
  const accessToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  return (
    <Route
      {...rest}
      render={
        props =>
          accessToken ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: redirectUrl,
                state: { from: props.location },
              }}
            />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};

export default PrivateRoute;
