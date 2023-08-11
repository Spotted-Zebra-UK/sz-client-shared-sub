import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@spotted-zebra-uk/sz-ui-shared.ui.link';
import { Checkbox } from '@spotted-zebra-uk/sz-ui-shared.widgets.checkbox';

interface IPrivacyPolicyCheckboxField {
  value: boolean;
  onChange: (value: boolean, name: string) => void;
  name: string;
  id: string;
  error?: string;
}

const PrivacyPolicyCheckboxField: FC<IPrivacyPolicyCheckboxField> = ({
  value,
  name,
  onChange,
  error,
  ...props
}) => {
  const { t } = useTranslation();
  const renderPrivacyPolicyCheckboxLabel = () => {
    return (
      <span className="SignUpForm__PrivacyPolicyCheckboxLabel">
        {t('authentication.signUp.iHaveReadThe')}
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

  const handleChange = () => {
    onChange(!value, name);
  };

  return (
    <div className="CheckboxFormField">
      <Checkbox
        label={renderPrivacyPolicyCheckboxLabel()}
        checked={value}
        onChange={handleChange}
        hasError={!!error?.length}
        {...props}
        bottomText={error}
      />
    </div>
  );
};

export default PrivacyPolicyCheckboxField;
