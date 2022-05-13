/* eslint-disable jsx-a11y/label-has-associated-control */
import './FloatingLabelTextArea.scss';
import { FC } from 'react';
import FieldLabelWithHint from '../FieldLabelWithHint/FieldLabelWithHint';

interface IFloatingLabelTextArea {
  className?: string;
  name: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  value: string;
  isDisabled?: boolean;
  id?: string;
  hint: string;
  label: string;
}

const FloatingLabelTextArea: FC<IFloatingLabelTextArea> = props => {
  const { value, onChange, isDisabled, name, hint, label, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value, name);
  };
  return (
    <div className="floating-label-container">
      <textarea
        id="input-text"
        className={`custom-input ${value && 'filled'}`}
        name={name}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        disabled={isDisabled || false}
        {...rest}
      />
      <div className="label">
        {hint ? <FieldLabelWithHint hint={hint} label={label} /> : label}
      </div>
    </div>
  );
};

export default FloatingLabelTextArea;
