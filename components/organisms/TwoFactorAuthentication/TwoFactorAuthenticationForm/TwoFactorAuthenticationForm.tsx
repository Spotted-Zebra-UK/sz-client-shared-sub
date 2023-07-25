import './TwoFactorAuthenticationForm.scss';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import FormField from '../../../atoms/FormField/FormField';
import Input from '../../../atoms/Input/Input';

interface ITwoFactorAuthenticationFormValues {
  mfaCode: string;
}

interface ITwoFactorAuthenticationForm {
  onSubmit: (mfaCode: string) => void;
}

const TwoFactorAuthenticationForm: FunctionComponent<ITwoFactorAuthenticationForm> =
  props => {
    const { t } = useTranslation();
    const [values, setValues] = useState<ITwoFactorAuthenticationFormValues>();
    const [error, setError] = useState<string>('');

    const handleChange = (value: string) => {
      setValues({ mfaCode: value });
      setError('');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (values && values.mfaCode) {
        props.onSubmit(values.mfaCode);
      } else {
        setError(t('authentication.twoFactorAuthentication.insert6DigitCode'));
      }
    };

    return (
      <form className="TwoFactorAuthenticationForm" onSubmit={handleSubmit}>
        <div className="TwoFactorAuthenticationForm__Fields">
          <FormField
            error={error}
            fieldName="mfaCode"
            label="mfaCode"
            isLabelVisible={!!values?.mfaCode}
          >
            <Input
              name="mfaCode"
              onChange={handleChange}
              placeholder={t('authentication.twoFactorAuthentication.code')}
              value={values?.mfaCode ? values.mfaCode.toString() : ''}
            />
          </FormField>
        </div>
        <Button
          type="submit"
          className="TwoFactorAuthenticationForm__SubmitButton"
        >
          {t('authentication.twoFactorAuthentication.submit')}
        </Button>
      </form>
    );
  };

export default TwoFactorAuthenticationForm;
