import './Input.scss';
import React, { FunctionComponent } from 'react';

interface IInput {
  className?: string;
  name: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  value: string;
  type?: 'text' | 'password' | 'date' | 'number';
  isDisabled?: boolean;
  id?: string;
}

const Input: FunctionComponent<IInput> = ({
  className,
  name,
  onChange,
  placeholder,
  value,
  type,
  isDisabled,
  id,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };

  return (
    <input
      className={`Input${className ? ` ${className}` : ''}`}
      name={name}
      onChange={handleChange}
      onBlur={handleChange}
      value={value}
      type={type || 'text'}
      disabled={isDisabled || false}
      placeholder={placeholder}
      id={id}
    />
  );
};

export default Input;
