import './CreatePassword.scss';
import { FC } from 'react';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import { ReactComponent as Logo } from '../../../icons/SpottedZebraLogo.svg';
import { TNotification } from '../../../interfaces/notification';
import BubblesBackground from '../../atoms/BubblesBackground/BubblesBackground';
import Notification from '../../atoms/Notification/Notification';
import CreatePasswordForm from './CreatePasswordForm/CreatePasswordForm';

interface ICreatePassword {
  loginRedirectUrl: string;
  notification: TNotification | undefined;
  onCreatePassword: (password: string) => void;
}

const CreatePassword: FC<ICreatePassword> = ({
  loginRedirectUrl,
  notification,
  onCreatePassword,
}) => {
  return (
    <div className="CreatePassword">
      <div className="CreatePassword__Top">
        <Logo className="CreatePassword__Top__Logo" />
        <div className="CreatePassword__Top__TitleWrapper">
          <BubblesBackground className="CreatePassword__Top__Title">
            <p className="CreatePassword__Top__Title__Row">Reset</p>
            <p className="CreatePassword__Top__Title__Row">password</p>
          </BubblesBackground>
          {notification ? <Notification notification={notification} /> : null}
        </div>
      </div>
      <CreatePasswordForm onSubmit={onCreatePassword} />
      <div className="CreatePassword__RedirectToLogin">
        Already have an account?{' '}
        <Link
          className="CreatePassword__Link"
          to={loginRedirectUrl}
          target="_self"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default CreatePassword;
