import './FormField.scss';
import React, { FunctionComponent } from 'react';

interface IFormField {
  error?: string | undefined;
  fieldName: string;
  label?: string;
  isLabelVisible?: boolean;
}

const FormField: FunctionComponent<IFormField> = ({
  children,
  error,
  label,
  fieldName,
  isLabelVisible = true,
}) => {
  return (
    <div className={`FormField FormField--${fieldName}`}>
      <label className="FormField__Label" htmlFor={fieldName}>
        <div
          className={`FormField__Label__Text${
            error ? ' FormField__Label__Text--HasError' : ''
          }`}
        >
          {label && isLabelVisible ? label : ''}
        </div>
        {children}
        <div className="FormField__Error">{error}</div>
      </label>
    </div>
  );
};

export default FormField;
