import './Login.scss';
import { FC } from 'react';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import { ReactComponent as Logo } from '../../../icons/SpottedZebraLogo.svg';
import { TNotification } from '../../../interfaces/notification';
import BubblesBackground from '../../atoms/BubblesBackground/BubblesBackground';
import Notification from '../../atoms/Notification/Notification';
import LoginForm from './LoginForm/LoginForm';

interface ILogin {
  loginNotification?: TNotification | null;
  onSignIn: (email: string, password: string) => void;
  email?: string;
  restorePasswordUrl?: string;
}

const Login: FC<ILogin> = ({
  loginNotification,
  onSignIn,
  email,
  restorePasswordUrl,
}) => {
  return (
    <div className="Login">
      <div className="Login__Top">
        <Logo className="Login__Top__Logo" />
        <div className="Login__Top__TitleWrapper">
          <BubblesBackground className="Login__Top__Title">
            <p className="Login__Top__Title__Row">Welcome</p>
          </BubblesBackground>
          {loginNotification ? (
            <Notification notification={loginNotification} />
          ) : null}
        </div>
      </div>
      <LoginForm email={email} onSubmit={onSignIn} />
      {restorePasswordUrl ? (
        <div className="Login__RedirectToRestorePassword">
          Forgot password?{' '}
          <Link className="Login__Link" to={restorePasswordUrl} target="_self">
            Reset here
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
