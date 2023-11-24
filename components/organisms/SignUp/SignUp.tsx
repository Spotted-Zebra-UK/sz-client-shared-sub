import './SignUp.scss';
import _ from 'lodash';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
//TODO - YL-182
// import { Link } from 'react-router-dom';
import BubblesBackground from '../../../components/atoms/BubblesBackground/BubblesBackground';
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
            <BubblesBackground className="SignUp__Top__Title">
              <p className="SignUp__Top__Title__Row">
                {_.capitalize(t('common.welcome'))}
              </p>
              <p className="SignUp__Top__Title__Row">{fullName}!</p>
            </BubblesBackground>
          ) : (
            <BubblesBackground className="SignUp__Top__Title">
              <p className="SignUp__Top__Title__Row">
                {_.capitalize(t('common.welcome'))}
              </p>
            </BubblesBackground>
          )}
          {notification ? <Notification notification={notification} /> : null}
        </div>
      </div>
      <SignUpForm fullName={fullName} email={email} onSignUp={onSignUp} />
      {loginRedirectUrl ? (
        <div className="SignUp__RedirectToLogin">
          {t('authentication.signUp.alreadyHaveAccount')}{' '}
          {/* <Link to={loginRedirectUrl}>{t('common.signIn')}</Link> */}
        </div>
      ) : null}
    </div>
  );
};

export default SignUpPresentational;
