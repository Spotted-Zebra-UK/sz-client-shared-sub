import { FunctionComponent } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import {
  AUTH_LOGIN_ROUTE,
  AUTH_TOKEN_STORAGE_KEY,
} from 'constants/authentication';
import { getCookie } from 'helpers/cookies';

interface IPrivateRoute extends RouteProps {
  component: FunctionComponent<RouteComponentProps>;
  redirectUrl?: string;
  allowed?: boolean;
}

export interface IPrivateRouteRedirectLocationState {
  from: Location;
}

const PrivateRoute: FunctionComponent<IPrivateRoute> = ({
  component: Component,
  redirectUrl = AUTH_LOGIN_ROUTE,
  allowed = true,
  ...rest
}) => {
  const accessToken = getCookie(AUTH_TOKEN_STORAGE_KEY);

  return (
    <Route
      {...rest}
      render={props =>
        accessToken && allowed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectUrl,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
