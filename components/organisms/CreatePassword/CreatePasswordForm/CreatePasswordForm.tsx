import './CreatePasswordForm.scss';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import { TextInputField } from '@spotted-zebra-uk/sz-ui-shared.widgets.text-input-field';
import { passwordValidationRegex } from '../../../../constants/validation';
import validate from '../../../../helpers/validate';

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
  const { t } = useTranslation();
  const [values, setValues] = useState<ICreatePasswordFormValues>({
    password: '',
  });
  const [errors, setErrors] = useState<ICreatePasswordFormErrors | undefined>();

  const CreatePasswordFormValidate = () => {
    return validate(values, {
      password: {
        format: {
          pattern: passwordValidationRegex,
          flags: 'i',
          // TODO: Fix localization [EN-1930]
          message:
            '^Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number or special character and be at least 8 characters long.',
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
    const newErrors = CreatePasswordFormValidate();
    if (newErrors) {
      setErrors(newErrors);
    } else {
      props.onSubmit(values.password);
    }
  };
  // TODO: Fix localization [EN-1930]
  return (
    <form className="CreatePasswordForm" onSubmit={handleSubmit}>
      <div className="CreatePasswordForm__Fields">
        <TextInputField
          id="password"
          label={t('authentication.signUp.createPassword')}
          value={values.password}
          placeholder={capitalize(t('common.password'))}
          onChange={handleChange}
          ariaLabel={t('authentication.signUp.createPassword')}
          hasError={!isEmpty(errors?.password)}
          bottomText={errors?.password?.join(' ')}
          type="password"
        />
      </div>
      <Button
        type="submit"
        fullWidth
        className="CreatePasswordForm__SubmitButton"
      >
        Confirm
      </Button>
    </form>
  );
};

export default CreatePasswordForm;
