import './RestorePassword.scss';
import { t } from 'i18next';
import { FC } from 'react';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import { ReactComponent as Logo } from '../../../icons/spottedzebra_new_logo.svg';
import { TNotification } from '../../../interfaces/notification';
import RestorePasswordForm from './RestorePasswordForm/RestorePasswordForm';

interface IRestorePassword {
  notification: TNotification | undefined;
  onRestorePassword: (email: string) => void;
  loginRedirectUrl: string;
}

const RestorePassword: FC<IRestorePassword> = ({
  onRestorePassword,
  loginRedirectUrl,
}) => {
  return (
    <div className="RestorePassword">
      <div className="RestorePassword__Top">
        <Logo className="RestorePassword__Top__Logo" />
        <div className="RestorePassword__Top__TitleWrapper">
          <p className="RestorePassword__Top__Title__Row">
            {t('authentication.restorePassword.resetPassword')}
          </p>
        </div>
      </div>
      <RestorePasswordForm onSubmit={onRestorePassword} />
      <div className="RestorePassword__RedirectToLogin">
        {t('authentication.restorePassword.alreadyHaveAccount')}
        <Link to={loginRedirectUrl} className="RestorePassword__Link">
          {t('authentication.login.signIn')}
        </Link>
      </div>
    </div>
  );
};

export default RestorePassword;
