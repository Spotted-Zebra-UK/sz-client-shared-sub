import './TwoFactorAuthentication.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import { ReactComponent as Logo } from '../../../icons/spottedzebra_new_logo.svg';
import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm/TwoFactorAuthenticationForm';

interface ITwoFactorAuthentication {
  onSubmit: (mfaCode: string) => void;
  requestMfaCode: () => void;
}

const TwoFactorAuthentication: FC<ITwoFactorAuthentication> = ({
  onSubmit,
  requestMfaCode,
}) => {
  const { t } = useTranslation();
  return (
    <div className="TwoFactorAuthentication">
      <div className="TwoFactorAuthentication__Top">
        <Logo className="TwoFactorAuthentication__Top__Logo" />
        <div className="TwoFactorAuthentication__Top__TitleWrapper">
          <p className="TwoFactorAuthentication__Top__Title__Row">
            {t(
              'authentication.twoFactorAuthentication.twoFactorAuthentication'
            )}
          </p>
        </div>
        <div className="TwoFactorAuthentication__Top__Heading">
          <p className="TwoFactorAuthentication__Top__Heading__Row">
            {t('authentication.twoFactorAuthentication.6DigitCodeInstruction')}
          </p>
          <p className="TwoFactorAuthentication__Top__Heading__Row">
            {t(
              'authentication.twoFactorAuthentication.pleaseInputTheCodeBelow'
            )}
          </p>
        </div>
      </div>
      <TwoFactorAuthenticationForm onSubmit={onSubmit} />
      <div className="TwoFactorAuthentication__RequestCode">
        <Button
          className="TwoFactorAuthentication__RequestCode__Button"
          onClick={requestMfaCode}
        >
          {t('authentication.twoFactorAuthentication.requestANewCode')}
        </Button>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
