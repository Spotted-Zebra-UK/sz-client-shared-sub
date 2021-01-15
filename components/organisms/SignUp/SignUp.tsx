import './SignUp.scss';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../icons/SpottedZebraLogo.svg';
import { TNotification } from '../../../interfaces/notification';
import BubblesBackground from '../../atoms/BubblesBackground/BubblesBackground';
import Notification from '../../atoms/Notification/Notification';
import SignUpForm from './SignUpForm/SignUpForm';

interface ISignUp {
  fullName?: string;
  email?: string;
  onSignUp: (
    fullName: string,
    email: string,
    password: string,
    appliedFrom: string,
    isPrivacyPolicyChecked: boolean
  ) => void;
  notification?: TNotification;
  loginRedirectUrl?: string;
  hasAppliedFromField: boolean;
}

const SignUpPresentational: FC<ISignUp> = ({
  fullName,
  email,
  onSignUp,
  notification,
  loginRedirectUrl,
  hasAppliedFromField,
}) => {
  return (
    <div
      className={`SignUp${!fullName ? ' SignUp--Full' : ' SignUp--PreFilled'}`}
    >
      <div className="SignUp__Top">
        <Logo className="SignUp__Top__Logo" />
        <div className="SignUp__Top__TitleWrapper">
          {fullName ? (
            <BubblesBackground className="SignUp__Top__Title">
              <p className="SignUp__Top__Title__Row">Welcome</p>
              <p className="SignUp__Top__Title__Row">{fullName}!</p>
            </BubblesBackground>
          ) : (
            <BubblesBackground className="SignUp__Top__Title">
              <p className="SignUp__Top__Title__Row">Welcome</p>
            </BubblesBackground>
          )}
          {notification ? <Notification notification={notification} /> : null}
        </div>
      </div>
      <SignUpForm
        hasAppliedFromField={hasAppliedFromField}
        fullName={fullName}
        email={email}
        onSignUp={onSignUp}
      />
      {loginRedirectUrl ? (
        <div className="SignUp__RedirectToLogin">
          Already have an account? <Link to={loginRedirectUrl}>Sign in</Link>
        </div>
      ) : null}
    </div>
  );
};

export default SignUpPresentational;
