import './LoginForm.scss';
import React, { FunctionComponent, useState } from 'react';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import validate from '../../../../helpers/validate';
import FormField from '../../../atoms/FormField/FormField';
import Input from '../../../atoms/Input/Input';
import PasswordInput from '../../../molecules/PasswordInput/PasswordInput';

interface ILoginFormValues {
  email: string;
  password: string;
}

interface ILoginFormErrors {
  email: string[];
}

interface ILoginForm {
  email?: string;
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: FunctionComponent<ILoginForm> = props => {
  const [values, setValues] = useState<ILoginFormValues>({
    email: props.email || '',
    password: '',
  });
  const [errors, setErrors] = useState<ILoginFormErrors | undefined>();

  const loginValidate = () => {
    return validate(values, {
      email: {
        email: {
          message: '^Not a valid email',
        },
      },
    });
  };

  const handleChange = (value: string, name: string) => {
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
      props.onSubmit(values.email, values.password);
    }
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div className="LoginForm__Fields">
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
          />
        </FormField>
        <FormField
          fieldName="password"
          label="Password"
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
      <Button type="submit" className="LoginForm__SubmitButton">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
