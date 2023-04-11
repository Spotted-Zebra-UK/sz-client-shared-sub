import './TwoFactorAuthentication.scss';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Logo } from '../../../icons/SpottedZebraLogo.svg';
import { TNotification } from '../../../interfaces/notification';
import BubblesBackground from '../../atoms/BubblesBackground/BubblesBackground';
import Button from '../../atoms/Button/Button';
import Notification from '../../atoms/Notification/Notification';
import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm/TwoFactorAuthenticationForm';

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
  const { t } = useTranslation();
  return (
    <div className="TwoFactorAuthentication">
      <div className="TwoFactorAuthentication__Top">
        <Logo className="TwoFactorAuthentication__Top__Logo" />
        <div className="TwoFactorAuthentication__Top__TitleWrapper">
          <BubblesBackground className="TwoFactorAuthentication__Top__Title">
            <p className="TwoFactorAuthentication__Top__Title__Row">
              {t('common.welcome')}
            </p>
          </BubblesBackground>
          {loginNotification ? (
            <Notification notification={loginNotification} />
          ) : null}
        </div>
        <div className="TwoFactorAuthentication__Top__Heading">
          <p className="TwoFactorAuthentication__Top__Heading__Row">
            {t('authentication.twoFactorAuthentication.6DigitCodeInstruction')}
          </p>
        </div>
      </div>
      <TwoFactorAuthenticationForm onSubmit={onSubmit} />
      <div className="TwoFactorAuthentication__RequestCode">
        <Button
          className="TwoFactorAuthentication__RequestCode__Button"
          onClick={requestMfaCode}
        >
          {t('authentication.twoFactorAuthentication.requestACode')}
        </Button>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
