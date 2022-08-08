import './Multiselect.scss';
import React, { FC, useMemo } from 'react';
import Select, { OnChangeValue } from 'react-select';
import { TSelectOption } from '../Select/Select';

interface IMultiselect {
  name: string;
  id: string;
  value: string[];
  options: TSelectOption[];
  placeholder?: string;
  onChange: (value: string[], name: string) => void;
}

const Multiselect: FC<IMultiselect> = ({
  options,
  name,
  onChange,
  id,
  placeholder = '',
  value,
}) => {
  const handleChange = (value: OnChangeValue<TSelectOption, true>) => {
    const values: string[] = value.map(valueItem => valueItem.value);
    onChange(values, name);
  };

  const valuesLabelObject: { [key in string]: string } = useMemo(
    () =>
      options.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {}),
    [options]
  );

  const selectedValues: TSelectOption[] | undefined = useMemo(() => {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.map(valueItem => {
      return {
        value: valueItem,
        label: valuesLabelObject[valueItem],
      };
    });
  }, [value, valuesLabelObject]);

  return (
    <Select
      className="Multiselect"
      classNamePrefix="Multiselect"
      placeholder={placeholder}
      id={id}
      name={name}
      closeMenuOnSelect={false}
      isMulti
      options={options}
      onChange={handleChange}
      value={selectedValues}
      maxMenuHeight={150}
    />
  );
};

export default Multiselect;
