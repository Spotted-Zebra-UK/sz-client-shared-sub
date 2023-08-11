import './SignUpForm.scss';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import { TextInputField } from '@spotted-zebra-uk/sz-ui-shared.widgets.text-input-field';
import { passwordValidationRegex } from '../../../../constants/validation';
import { formatFullName } from '../../../../helpers/fullName';
import validate from '../../../../helpers/validate';
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
  const { t } = useTranslation();
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
          tooShort: `^${t(
            'authentication.signUp.firstNameAndLastNameMustBeProvided'
          )}`,
          tokenizer: (value: string) => {
            return formatFullName(value).split(/\s+/g);
          },
        },
      },
      email: {
        email: {
          message: `^${t('common.notValidEmail')}`,
        },
      },
      password: {
        format: {
          pattern: passwordValidationRegex,
          flags: 'i',
          message: `^${t('authentication.signUp.yourPasswordMustHave')}`,
        },
      },
      isPrivacyPolicyChecked: {
        exclusion: {
          within: { false: false },
          message: `^${t('authentication.signUp.privacyNoticeMustBeCached')}`,
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

  const handleChangePrivacyPolicyCheck = () => {
    setValues(prevValues => ({
      ...prevValues,
      isPrivacyPolicyChecked: !prevValues.isPrivacyPolicyChecked,
    }));
    setErrors(prevErrors =>
      prevErrors ? { ...prevErrors, isPrivacyPolicyChecked: [] } : prevErrors
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = loginValidate();
    if (newErrors) {
      setErrors(newErrors);
    } else {
      props.onSignUp(
        formatFullName(values.fullName),
        values.email,
        values.password,
        values.isPrivacyPolicyChecked
      );
    }
  };

  return (
    <form className="SignUpForm" onSubmit={handleSubmit}>
      <div className="SignUpForm__Fields">
        <TextInputField
          id="fullName"
          label={t('authentication.signUp.fullName')}
          value={values.fullName}
          placeholder={t('authentication.signUp.fullName')}
          onChange={handleChange}
          ariaLabel={t('authentication.signUp.fullName')}
          hasError={!isEmpty(errors?.fullName)}
          bottomText={errors?.fullName?.join(' ')}
          disabled={!!props.fullName?.length}
        />
        <TextInputField
          id="email"
          label={capitalize(t('common.email'))}
          value={values.email}
          placeholder={capitalize(t('common.email'))}
          onChange={handleChange}
          ariaLabel={t('common.email')}
          hasError={!isEmpty(errors?.email)}
          bottomText={errors?.email?.join(' ')}
          disabled={!!props.email?.length}
          type="email"
        />
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
      <div className="SignUpForm__Bottom">
        <PrivacyPolicyCheckboxField
          value={values.isPrivacyPolicyChecked}
          onChange={handleChangePrivacyPolicyCheck}
          name="isPrivacyPolicyChecked"
          id="SignUpIsPrivacyPolicyChecked"
          error={errors?.isPrivacyPolicyChecked?.join(' ')}
        />
        <Button type="submit" className="SignUpForm__SubmitButton">
          {t('authentication.signUp.createAccount')}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
