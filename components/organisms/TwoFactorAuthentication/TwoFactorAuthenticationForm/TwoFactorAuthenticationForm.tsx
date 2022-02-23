import './TwoFactorAuthenticationForm.scss';
import React, { FunctionComponent, useState } from 'react';
import FormField from '../../../atoms/FormField/FormField';
import Input from '../../../atoms/Input/Input';
import SquareButton from '../../../molecules/SquareButton/SquareButton';

interface ITwoFactorAuthenticationFormValues {
  mfaCode: number;
}

interface ITwoFactorAuthenticationForm {
  onSubmit: (mfaCode: number) => void;
}

const TwoFactorAuthenticationForm: FunctionComponent<ITwoFactorAuthenticationForm> = props => {
  const [values, setValues] = useState<ITwoFactorAuthenticationFormValues>();
  const [error, setError] = useState<string>('');

  const handleChange = (value: string) => {
    setValues({ mfaCode: +value });
    setError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values && values.mfaCode) {
      props.onSubmit(values.mfaCode);
    } else {
      setError('Please insert a 6-digit code');
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
            placeholder="Code"
            value={values?.mfaCode ? values.mfaCode.toString() : ''}
          />
        </FormField>
      </div>
      <SquareButton type="submit">Submit</SquareButton>
    </form>
  );
};

export default TwoFactorAuthenticationForm;
