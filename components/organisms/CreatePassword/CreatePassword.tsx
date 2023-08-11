import './CreatePassword.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import { ReactComponent as Logo } from '../../../icons/spottedzebra_new_logo.svg';
import { TNotification } from '../../../interfaces/notification';
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
  const { t } = useTranslation();
  return (
    <div className="CreatePassword">
      <div className="CreatePassword__Top">
        <Logo className="CreatePassword__Top__Logo" />
        <div className="CreatePassword__Top__TitleWrapper">
          <p className="CreatePassword__Top__Title__Row">
            {t('authentication.restorePassword.setNewPassword')}
          </p>
          {notification ? <Notification notification={notification} /> : null}
        </div>
      </div>
      <CreatePasswordForm onSubmit={onCreatePassword} />
      <div className="CreatePassword__RedirectToLogin">
        {t('authentication.restorePassword.alreadyHaveAccount')}{' '}
        <Link className="CreatePassword__Link" to={loginRedirectUrl}>
          {t('authentication.login.signIn')}
        </Link>
      </div>
    </div>
  );
};

export default CreatePassword;
