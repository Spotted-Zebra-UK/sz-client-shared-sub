import './Login.scss';
import { ReactComponent as Logo } from 'assets/icons/spottedzebra_new_logo.svg';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import { TNotification } from '../../../interfaces/notification';
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
  const { t } = useTranslation();
  return (
    <div className="Login">
      <div className="Login__Top">
        <Logo className="Login__Top__Logo" />
        <div className="Login__Top__TitleWrapper">
          <p className="Login__Top__Title__Row">
            {t('authentication.login.signIn')}
          </p>
          {loginNotification ? (
            <Notification notification={loginNotification} />
          ) : null}
        </div>
      </div>
      <LoginForm email={email} onSubmit={onSignIn} />
      {restorePasswordUrl ? (
        <div className="Login__RedirectToRestorePassword">
          <Link className="Login__Link" to={restorePasswordUrl}>
            {t('authentication.restorePassword.resetPassword')}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
