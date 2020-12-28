/* eslint-disable @typescript-eslint/indent */
import './CreatePasswordForm.scss';
import React, { FC, useState } from 'react';
import validate from '../../../../helpers/validate';
import { TFormFieldValue } from '../../../../interfaces/form';
import FormField from '../../../atoms/FormField/FormField';
import PasswordInput from '../../../molecules/PasswordInput/PasswordInput';
import SquareButton from '../../../molecules/SquareButton/SquareButton';

interface ICreatePasswordFormValues {
  password: string;
}

interface ICreatePasswordFormErrors {
  password: string[];
}

interface ICreatePasswordFormForm {
  onSubmit: (password: string) => void;
}

const CreatePasswordForm: FC<ICreatePasswordFormForm> = props => {
  const [values, setValues] = useState<ICreatePasswordFormValues>({
    password: '',
  });
  const [errors, setErrors] = useState<ICreatePasswordFormErrors | undefined>();

  const CreatePasswordFormValidate = () => {
    return validate(values, {
      password: {
        length: { minimum: 5 },
      },
    });
  };

  const handleChange = (value: TFormFieldValue, name: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
    setErrors(prevErrors =>
      prevErrors ? { ...prevErrors, [name]: [] } : prevErrors
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = CreatePasswordFormValidate();
    if (newErrors) {
      setErrors(newErrors);
    } else {
      props.onSubmit(values.password);
    }
  };

  return (
    <form className="CreatePasswordForm" onSubmit={handleSubmit}>
      <div className="CreatePasswordForm__Fields">
        <FormField
          error={errors && errors.password && errors.password.join(' ')}
          fieldName="password"
          label="Password"
        >
          <PasswordInput
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={values.password}
          />
        </FormField>
      </div>
      <SquareButton type="submit">Confirm</SquareButton>
    </form>
  );
};

export default CreatePasswordForm;
