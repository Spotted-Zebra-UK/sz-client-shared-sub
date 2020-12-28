import React, { FC } from 'react';
import { TCheckboxFormFieldValue } from '../../../interfaces/form';

interface ICheckbox {
  isDisabled?: boolean;
  name: string;
  id?: string;
  onChange: (value: TCheckboxFormFieldValue, name: string) => void;
  value: TCheckboxFormFieldValue;
}

const Checkbox: FC<ICheckbox> = ({ isDisabled, name, id, onChange, value }) => {
  const handleOnChange = () => {
    onChange(!value, name);
  };

  return (
    <input
      checked={value}
      className="Checkbox"
      disabled={isDisabled}
      id={id}
      name={name}
      onChange={handleOnChange}
      type="checkbox"
    />
  );
};

export default Checkbox;
