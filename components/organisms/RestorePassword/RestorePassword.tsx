import './RestorePassword.scss';
import { FC } from 'react';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import { ReactComponent as Logo } from '../../../icons/SpottedZebraLogo.svg';
import { TNotification } from '../../../interfaces/notification';
import BubblesBackground from '../../atoms/BubblesBackground/BubblesBackground';
import Notification from '../../atoms/Notification/Notification';
import RestorePasswordForm from './RestorePasswordForm/RestorePasswordForm';

interface IRestorePassword {
  notification: TNotification | undefined;
  onRestorePassword: (email: string) => void;
  loginRedirectUrl: string;
}

const RestorePassword: FC<IRestorePassword> = ({
  notification,
  onRestorePassword,
  loginRedirectUrl,
}) => {
  return (
    <div className="RestorePassword">
      <div className="RestorePassword__Top">
        <Logo className="RestorePassword__Top__Logo" />
        <div className="RestorePassword__Top__TitleWrapper">
          <BubblesBackground className="RestorePassword__Top__Title">
            <p className="RestorePassword__Top__Title__Row">Restore password</p>
          </BubblesBackground>
          {notification ? <Notification notification={notification} /> : null}
        </div>
      </div>
      <RestorePasswordForm onSubmit={onRestorePassword} />
      <div className="RestorePassword__RedirectToLogin">
        Already have an account?{' '}
        <Link
          to={loginRedirectUrl}
          className="RestorePassword__Link"
          target="_self"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RestorePassword;
