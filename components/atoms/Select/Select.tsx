import './Select.scss';
import React, { FC, useMemo } from 'react';
import RSSelect, { ActionMeta, OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

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
  menuPlacement?: 'top' | 'bottom' | 'auto';
  maxMenuHeight?: number;
  searchable: boolean;
  createable: boolean;
}

const Select: FC<ISelect> = ({
  options,
  name,
  onChange,
  id,
  placeholder = '',
  value,
  menuPlacement,
  maxMenuHeight = 100,
  searchable,
  createable,
}) => {
  console.log('createable', createable);
  const handleChange = (
    newValue: OnChangeValue<TSelectOption, false>,
    actionMeta: ActionMeta<TSelectOption>
  ) => {
    console.group('Value Changed');
    if (actionMeta.action === 'create-option' && newValue) {
      options.push({ value: newValue.value, label: newValue.label });
    }

    onChange(newValue?.value || '', name);
    console.log(options);

    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const valuesLabelObject: { [key in string]: string } = useMemo(
    () =>
      options.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options && options.length]
  );

  const selectedValue = value
    ? { value, label: valuesLabelObject[value as string] }
    : null;
  const props = {
    className: 'Select',
    classNamePrefix: 'Select',
    id,
    name,
    options: [{ value: '', label: '' }, ...options],
    onChange: handleChange,
    value: selectedValue,
    placeholder,
    maxMenuHeight,
    menuPlacement,
    isSearchable: searchable,
  };
  if (createable) {
    return <CreatableSelect {...props} />;
  }

  return <RSSelect {...props} />;
};

export default Select;
