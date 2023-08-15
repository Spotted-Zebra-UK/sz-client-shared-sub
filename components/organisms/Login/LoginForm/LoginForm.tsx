import './LoginForm.scss';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import { TextInputField } from '@spotted-zebra-uk/sz-ui-shared.widgets.text-input-field';
import validate from '../../../../helpers/validate';

interface ILoginFormValues {
  email: string;
  password: string;
}

interface ILoginFormErrors {
  email: string[];
  password: string;
}

interface ILoginForm {
  email?: string;
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: FunctionComponent<ILoginForm> = props => {
  const { t } = useTranslation();
  const [values, setValues] = useState<ILoginFormValues>({
    email: props.email || '',
    password: '',
  });
  const [errors, setErrors] = useState<ILoginFormErrors | undefined>();

  const loginValidate = () => {
    return validate(values, {
      email: {
        email: {
          // TODO: Fix localization [EN-1930]
          message: `^${t('common.notValidEmail')}`,
        },
      },
      password: {
        presence: {
          allowEmpty: false,
          message: `^${t('common.emptyPassword')}`,
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
        <TextInputField
          id="email"
          label={capitalize(t('common.email'))}
          value={values.email}
          placeholder={capitalize(t('common.email'))}
          onChange={handleChange}
          ariaLabel={t('common.email')}
          hasError={!isEmpty(errors?.email)}
          bottomText={errors?.email?.join(' ')}
          type="email"
        />
        <TextInputField
          id="password"
          label={capitalize(t('common.password'))}
          value={values.password}
          placeholder={capitalize(t('common.password'))}
          onChange={handleChange}
          hasError={!isEmpty(errors?.password)}
          bottomText={errors?.password}
          ariaLabel={capitalize(t('common.password'))}
          type="password"
        />
      </div>
      {/* TODO: Fix localization [EN-1930] */}
      <Button type="submit" className="LoginForm__SubmitButton">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
