import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import CheckboxFormField from '../../../../../components/molecules/CheckboxFormField/CheckboxFormField';

interface IPrivacyPolicyCheckboxField {
  value: boolean;
  onChange: (value: boolean, name: string) => void;
  name: string;
  id: string;
  error?: string;
}

const PrivacyPolicyCheckboxField: FC<IPrivacyPolicyCheckboxField> = props => {
  const { t } = useTranslation();
  const renderPrivacyPolicyCheckboxLabel = () => {
    return (
      <span className="SignUpForm__PrivacyPolicyCheckboxLabel">
        {t('authentication.signUp.iHaveReadThe')}{' '}
        <Link
          to="https://www.spottedzebra.co.uk/privacy/privacy"
          target="_blank"
        >
          {t('authentication.signUp.privacyNotice')}
        </Link>
        {t('authentication.signUp.iAmAnAdult')}
      </span>
    );
  };

  return (
    <CheckboxFormField label={renderPrivacyPolicyCheckboxLabel()} {...props} />
  );
};

export default PrivacyPolicyCheckboxField;
