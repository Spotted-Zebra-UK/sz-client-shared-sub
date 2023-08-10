import './SignUp.scss';
import _ from 'lodash';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import Notification from '../../../components/atoms/Notification/Notification';
import { ReactComponent as Logo } from '../../../icons/SpottedZebraLogo.svg';
import { TNotification } from '../../../interfaces/notification';
import SignUpForm from './SignUpForm/SignUpForm';

interface ISignUp {
  fullName?: string;
  email?: string;
  onSignUp: (
    fullName: string,
    email: string,
    password: string,
    isPrivacyPolicyChecked: boolean
  ) => void;
  notification?: TNotification;
  loginRedirectUrl?: string;
}

const SignUpPresentational: FC<ISignUp> = ({
  fullName,
  email,
  onSignUp,
  notification,
  loginRedirectUrl,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`SignUp${!fullName ? ' SignUp--Full' : ' SignUp--PreFilled'}`}
    >
      <div className="SignUp__Top">
        <Logo className="SignUp__Top__Logo" />
        <div className="SignUp__Top__TitleWrapper">
          {fullName ? (
            <div className="SignUp__Top__Title">
              <p className="SignUp__Top__Title__Row">
                {_.capitalize(t('authentication.signUp.createAccount'))}
              </p>
              <p className="SignUp__Top__Title__Row">{fullName}!</p>
            </div>
          ) : (
            <div className="SignUp__Top__Title">
              <p className="SignUp__Top__Title__Row">
                {_.capitalize(t('authentication.signUp.createAccount'))}
              </p>
            </div>
          )}
          {notification ? <Notification notification={notification} /> : null}
        </div>
      </div>
      <SignUpForm fullName={fullName} email={email} onSignUp={onSignUp} />
      {loginRedirectUrl ? (
        <div className="SignUp__RedirectToLogin">
          {t('authentication.signUp.alreadyHaveAccount')}{' '}
          <Link to={loginRedirectUrl} className="SignUp__Link">
            {t('common.signIn')}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default SignUpPresentational;
