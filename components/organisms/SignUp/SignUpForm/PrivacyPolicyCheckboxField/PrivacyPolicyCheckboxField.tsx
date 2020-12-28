import React, { FC } from 'react';
import CheckboxFormField from '../../../../molecules/CheckboxFormField/CheckboxFormField';

interface PrivacyPolicyCheckboxField {
  value: boolean;
  onChange: (value: boolean, name: string) => void;
  name: string;
  id: string;
  error?: string;
}

const PrivacyPolicyCheckboxField: FC<PrivacyPolicyCheckboxField> = props => {
  const renderPrivacyPolicyCheckboxLabel = () => {
    return (
      <span className="SignUpForm__PrivacyPolicyCheckboxLabel">
        I have read the{' '}
        <a
          className="SignUpForm__PrivacyPolicyCheckboxLabel__Link"
          href="https://www.spottedzebra.co.uk/privacy/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Notice
        </a>
        , and I am an adult.
      </span>
    );
  };

  return (
    <CheckboxFormField label={renderPrivacyPolicyCheckboxLabel()} {...props} />
  );
};

export default PrivacyPolicyCheckboxField;
