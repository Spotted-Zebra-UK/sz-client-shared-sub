import './Input.scss';
import React, { FunctionComponent } from 'react';

interface IInput {
  className?: string;
  name: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  value: string;
  type?: 'text' | 'password';
  isDisabled?: boolean;
  id?: string;
}

const Input: FunctionComponent<IInput> = props => {
  const { type, value, onChange, className, isDisabled, name, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };

  return (
    <input
      className={`Input${className ? ` ${className}` : ''}`}
      onChange={handleChange}
      onBlur={handleChange}
      value={value}
      type={type || 'text'}
      disabled={isDisabled || false}
      {...rest}
    />
  );
};

export default Input;
