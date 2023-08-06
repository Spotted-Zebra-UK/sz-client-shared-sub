import './TwoFactorAuthenticationForm.scss';
import isEmpty from 'lodash/isEmpty';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import { TextInputField } from '@spotted-zebra-uk/sz-ui-shared.widgets.text-input-field';

interface ITwoFactorAuthenticationFormValues {
  mfaCode: string;
}

interface ITwoFactorAuthenticationForm {
  onSubmit: (mfaCode: string) => void;
}

const TwoFactorAuthenticationForm: FunctionComponent<ITwoFactorAuthenticationForm> =
  props => {
    const { t } = useTranslation();
    const [values, setValues] = useState<ITwoFactorAuthenticationFormValues>({
      mfaCode: '',
    });
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
          <TextInputField
            id="mfaCode"
            label={t('authentication.twoFactorAuthentication.code')}
            value={values.mfaCode}
            placeholder={t('authentication.twoFactorAuthentication.code')}
            onChange={handleChange}
            ariaLabel={t('authentication.twoFactorAuthentication.code')}
            hasError={!isEmpty(error)}
            bottomText={error}
          />
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
