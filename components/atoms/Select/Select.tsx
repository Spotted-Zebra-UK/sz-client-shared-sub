import './Select.scss';
import React, { FC, useMemo } from 'react';
import RSSelect, { OptionTypeBase } from 'react-select';

export type TSelectOption = {
  label: string;
  value: string;
};

interface ISelect {
  name: string;
  id: string;
  value: string;
  options: TSelectOption[];
  placeholder?: string;
  onChange: (value: string, name: string) => void;
}

const Select: FC<ISelect> = ({
  options,
  name,
  onChange,
  id,
  placeholder = '',
  value,
}) => {
  const handleChange = (selectedOption: OptionTypeBase | null) => {
    onChange(selectedOption?.value || '', name);
  };

  const valuesLabelObject: { [key in string]: string } = useMemo(
    () =>
      options.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {}),
    [options]
  );

  const selectedValue = value
    ? { value, label: valuesLabelObject[value as string] }
    : null;

  return (
    <RSSelect
      className="Select"
      classNamePrefix="Select"
      id={id}
      name={name}
      options={[{ value: '', label: '' }, ...options]}
      onChange={handleChange}
      value={selectedValue}
      placeholder={placeholder}
      maxMenuHeight={150}
    />
  );
};

export default Select;
