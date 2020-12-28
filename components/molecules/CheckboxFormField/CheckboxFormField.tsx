import './CheckboxFormField.scss';
import React, { FC } from 'react';
import { ReactComponent as CheckboxCheckedIcon } from '../../../icons/CheckboxChecked.svg';
import { ReactComponent as CheckboxEmptyIcon } from '../../../icons/CheckboxEmpty.svg';
import { TCheckboxFormFieldValue } from '../../../interfaces/form';
import Checkbox from '../../atoms/Checkbox/Checkbox';

interface ICheckboxFormField {
  className?: string;
  isDisabled?: boolean;
  name: string;
  id: string;
  onChange: (value: TCheckboxFormFieldValue, name: string) => void;
  value: boolean;
  label?: string | React.ReactNode;
  error?: string;
}

const CheckboxFormField: FC<ICheckboxFormField> = ({
  value,
  className,
  label,
  id,
  error,
  ...restProps
}) => {
  return (
    <div className={`CheckboxFormField${className ? ` ${className}` : ''}`}>
      <label htmlFor={id} className="CheckboxFormField__Label">
        <div className="CheckboxFormField__Label__Top">
          <Checkbox value={value} id={id} {...restProps} />
          {value ? <CheckboxCheckedIcon /> : <CheckboxEmptyIcon />}
          {label ? (
            <div className="CheckboxFormField__Label__Top__Input">{label}</div>
          ) : null}
        </div>
        <div className="CheckboxFormField__Label__Error">{error}</div>
      </label>
    </div>
  );
};

export default CheckboxFormField;
