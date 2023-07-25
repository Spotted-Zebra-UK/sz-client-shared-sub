import './RestorePasswordForm.scss';
import React, { FC, useState } from 'react';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import validate from '../../../../helpers/validate';
import FormField from '../../../atoms/FormField/FormField';
import Input from '../../../atoms/Input/Input';

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
      </div>
      <Button type="submit" className="RestorePasswordForm__SubmitButton">
        Reset password
      </Button>
    </form>
  );
};

export default RestorePasswordForm;
