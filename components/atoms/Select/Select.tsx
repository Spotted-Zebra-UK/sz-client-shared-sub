/* eslint-disable jsx-a11y/control-has-associated-label */
import './Select.scss';
import React, { ChangeEvent, FC } from 'react';

export type TSelectOption = { label: string; value: string };

interface ISelect {
  name: string;
  id: string;
  value: string;
  options: TSelectOption[];
  placeholder?: string;
  onChange: (value: string, name: string) => void;
}

const Select: FC<ISelect> = ({
  name,
  id,
  value,
  options,
  onChange,
  placeholder,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value, name);
  };

  return (
    <select
      className="Select"
      name={name}
      id={id}
      value={value}
      onChange={handleChange}
    >
      <option value="">{placeholder || ''}</option>
      {options.map(selectOption => (
        <option key={selectOption.value} value={selectOption.value}>
          {selectOption.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
