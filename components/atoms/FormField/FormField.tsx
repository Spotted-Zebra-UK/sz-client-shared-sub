import './FormField.scss';
import React, { FunctionComponent } from 'react';

interface IFormField {
  error?: string;
  fieldName: string;
  label?: string;
}

const FormField: FunctionComponent<IFormField> = ({
  children,
  error,
  label,
  fieldName,
}) => {
  return (
    <div className={`FormField FormField--${fieldName}`}>
      <label className="FormField__Label" htmlFor={fieldName}>
        {label ? (
          <div
            className={`FormField__Label__Text${
              error ? ' FormField__Label__Text--HasError' : ''
            }`}
          >
            {label}
          </div>
        ) : null}
        {children}
        <div className="FormField__Error">{error}</div>
      </label>
    </div>
  );
};

export default FormField;
