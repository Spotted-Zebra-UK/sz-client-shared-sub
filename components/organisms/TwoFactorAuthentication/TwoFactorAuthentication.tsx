import './TwoFactorAuthentication.scss';
import React, { FC } from 'react';
import { ReactComponent as Logo } from '../../../icons/SpottedZebraLogo.svg';
import { TNotification } from '../../../interfaces/notification';
import BubblesBackground from '../../atoms/BubblesBackground/BubblesBackground';
import Notification from '../../atoms/Notification/Notification';
import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm/TwoFactorAuthenticationForm';
import Button from '../../atoms/Button/Button';

interface ITwoFactorAuthentication {
  loginNotification?: TNotification | null;
  onSubmit: (mfaCode: number) => void;
  requestMfaCode: () => void;
}

const TwoFactorAuthentication: FC<ITwoFactorAuthentication> = ({
  loginNotification,
  onSubmit,
  requestMfaCode,
}) => {
  return (
    <div className="TwoFactorAuthentication">
      <div className="TwoFactorAuthentication__Top">
        <Logo className="TwoFactorAuthentication__Top__Logo" />
        <div className="TwoFactorAuthentication__Top__TitleWrapper">
          <BubblesBackground className="TwoFactorAuthentication__Top__Title">
            <p className="TwoFactorAuthentication__Top__Title__Row">Welcome</p>
          </BubblesBackground>
          {loginNotification ? (
            <Notification notification={loginNotification} />
          ) : null}
        </div>
        <div className="TwoFactorAuthentication__Top__Heading">
          <p className="TwoFactorAuthentication__Top__Heading__Row">
            We've sent you a 6-digit code to your email. Please input the code
            below
          </p>
        </div>
      </div>
      <TwoFactorAuthenticationForm onSubmit={onSubmit} />
      <div className="TwoFactorAuthentication__RequestCode">
        <Button
          className="TwoFactorAuthentication__RequestCode__Button"
          onClick={requestMfaCode}
        >
          Request a code
        </Button>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
