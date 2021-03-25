import './SignUpForm.scss';
import React, { FC, useState } from 'react';
import validate from '../../../../helpers/validate';
import { TFormFieldValue } from '../../../../interfaces/form';
import FormField from '../../../atoms/FormField/FormField';
import Input from '../../../atoms/Input/Input';
import PasswordInput from '../../../molecules/PasswordInput/PasswordInput';
import SquareButton from '../../../molecules/SquareButton/SquareButton';
import PrivacyPolicyCheckboxField from './PrivacyPolicyCheckboxField/PrivacyPolicyCheckboxField';

interface ISignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  isPrivacyPolicyChecked: boolean;
}

interface ISignUpFormErrors {
  fullName: string[];
  email: string[];
  password: string[];
  isPrivacyPolicyChecked: string[];
}

interface ISignUpForm {
  fullName?: string;
  email?: string;
  onSignUp: (
    fullName: string,
    email: string,
    password: string,
    isPrivacyPolicyChecked: boolean
  ) => void;
}

const SignUpForm: FC<ISignUpForm> = props => {
  const [values, setValues] = useState<ISignUpFormValues>({
    fullName: props.fullName || '',
    email: props.email || '',
    password: '',
    isPrivacyPolicyChecked: false,
  });
  const [errors, setErrors] = useState<ISignUpFormErrors | undefined>();

  const loginValidate = () => {
    return validate(values, {
      fullName: {
        length: {
          minimum: 2,
          tooShort: '^First name and last name must be provided.',
          tokenizer: (value: string) => {
            return value.split(/\s+/g);
          },
        },
      },
      email: {
        email: {
          message: '^Not a valid email.',
        },
      },
      password: {
        length: { minimum: 5 },
      },
      isPrivacyPolicyChecked: {
        exclusion: {
          within: { false: false },
          message: '^Privacy Notice must be cheked.',
        },
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
    const newErrors = loginValidate();
    if (newErrors) {
      setErrors(newErrors);
    } else {
      props.onSignUp(
        values.fullName,
        values.email,
        values.password,
        values.isPrivacyPolicyChecked
      );
    }
  };

  return (
    <form className="SignUpForm" onSubmit={handleSubmit}>
      <div className="SignUpForm__Fields">
        {!props.fullName ? (
          <FormField
            error={errors && errors.fullName && errors.fullName.join(' ')}
            fieldName="fullName"
            label="Full name"
            isLabelVisible={!!values.fullName}
          >
            <Input
              name="fullName"
              onChange={handleChange}
              placeholder="Full name"
              value={values.fullName}
            />
          </FormField>
        ) : null}
        <FormField
          error={errors && errors.email && errors.email.join(' ')}
          fieldName="email"
          label="Email"
          isLabelVisible={!!values.email}
        >
          <Input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            value={values.email}
            isDisabled={!!props.email}
          />
        </FormField>
        <FormField
          error={errors && errors.password && errors.password.join(' ')}
          fieldName="password"
          label="Create Password"
          isLabelVisible={!!values.password}
        >
          <PasswordInput
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={values.password}
          />
        </FormField>
      </div>
      <div className="SignUpForm__Bottom">
        <PrivacyPolicyCheckboxField
          value={values.isPrivacyPolicyChecked}
          onChange={handleChange}
          name="isPrivacyPolicyChecked"
          id="SignUpIsPrivacyPolicyChecked"
          error={errors?.isPrivacyPolicyChecked?.join(' ')}
        />
        <SquareButton type="submit">Create an account</SquareButton>
      </div>
    </form>
  );
};

export default SignUpForm;
