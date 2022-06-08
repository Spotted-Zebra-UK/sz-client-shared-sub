/* eslint-disable jsx-a11y/label-has-associated-control */
import './FloatingLabelInput.scss';
import { FC } from 'react';
import FieldLabelWithHint from '../FieldLabelWithHint/FieldLabelWithHint';

interface IFloatingLabelInput {
  className?: string;
  name: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  value: string;
  type?: 'text' | 'password' | 'date';
  isDisabled?: boolean;
  id?: string;
  hint: string;
  label: string;
  labelStyle?: object;
}

const FloatingLabelInput: FC<IFloatingLabelInput> = props => {
  const {
    type,
    value,
    onChange,
    isDisabled,
    name,
    hint,
    label,
    labelStyle,
    ...rest
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };
  return (
    <div className="floating-label-container">
      <input
        id="input-text"
        className={`custom-input ${value && 'filled'}`}
        name={name}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        type={type || 'text'}
        disabled={isDisabled || false}
        pattern=".*"
        style={labelStyle}
        {...rest}
      />
      <div className="label" style={labelStyle}>
        {hint ? <FieldLabelWithHint hint={hint} label={label} /> : label}
      </div>
    </div>
  );
};

export default FloatingLabelInput;
