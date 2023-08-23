import './RestorePasswordForm.scss';
import { capitalize } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import { TextInputField } from '@spotted-zebra-uk/sz-ui-shared.widgets.text-input-field';
import validate from '../../../../helpers/validate';

interface IRestorePasswordFormValues {
  email: string;
}

interface IRestorePasswordFormErrors {
  email: string[];
}

interface IRestorePasswordFormForm {
  onSubmit: (email: string) => void;
}

const RestorePasswordForm: FC<IRestorePasswordFormForm> = props => {
  const { t } = useTranslation();
  const [values, setValues] = useState<IRestorePasswordFormValues>({
    email: '',
  });
  const [errors, setErrors] = useState<
    IRestorePasswordFormErrors | undefined
  >();

  const restorePasswordFormValidate = () => {
    return validate(values, {
      email: {
        email: {
          // TODO: Fix localization [EN-1930]
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
    const newErrors = restorePasswordFormValidate();
    if (newErrors) {
      setErrors(newErrors);
    } else {
      props.onSubmit(values.email);
    }
  };

  return (
    <form className="RestorePasswordForm" onSubmit={handleSubmit}>
      <div className="RestorePasswordForm__Fields">
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
      </div>
      {/* TODO: Fix localization [EN-1930] */}
      <Button
        type="submit"
        className="RestorePasswordForm__SubmitButton"
        fullWidth
      >
        Reset password
      </Button>
    </form>
  );
};

export default RestorePasswordForm;
