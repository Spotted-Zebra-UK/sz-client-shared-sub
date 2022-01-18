import './SignUpForm.scss';
import _ from 'lodash';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormField from '../../../../components/atoms/FormField/FormField';
import Input from '../../../../components/atoms/Input/Input';
import PasswordInput from '../../../../components/molecules/PasswordInput/PasswordInput';
import SquareButton from '../../../../components/molecules/SquareButton/SquareButton';
import { passwordValidationRegex } from '../../../../constants/validation';
import validate from '../../../../helpers/validate';
import { TFormFieldValue } from '../../../../interfaces/form';
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
            return value.split(/\s+/g);
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
            label={t('authentication.signUp.fullName')}
            isLabelVisible={!!values.fullName}
          >
            <Input
              name="fullName"
              onChange={handleChange}
              placeholder={t('authentication.signUp.fullName')}
              value={values.fullName}
            />
          </FormField>
        ) : null}
        <FormField
          error={errors && errors.email && errors.email.join(' ')}
          fieldName="email"
          label={_.capitalize(t('common.email'))}
          isLabelVisible={!!values.email}
        >
          <Input
            name="email"
            onChange={handleChange}
            placeholder={_.capitalize(t('common.email'))}
            value={values.email}
            isDisabled={!!props.email}
          />
        </FormField>
        <FormField
          error={errors && errors.password && errors.password.join(' ')}
          fieldName="password"
          label={t('authentication.signUp.createPassword')}
          isLabelVisible={!!values.password}
        >
          <PasswordInput
            name="password"
            onChange={handleChange}
            placeholder={_.capitalize(t('common.password'))}
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
        <SquareButton type="submit">
          {t('authentication.signUp.createAccount')}
        </SquareButton>
      </div>
    </form>
  );
};

export default SignUpForm;
