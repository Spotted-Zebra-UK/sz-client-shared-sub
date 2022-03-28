import './PasswordInput.scss';
import React, { FC, useState } from 'react';
import { ReactComponent as EyeIcon } from '../../../icons/Eye.svg';
import { ReactComponent as EyeSolidIcon } from '../../../icons/EyeSolid.svg';
import Button from '../../atoms/Button/Button';

interface IPasswordInput {
  name: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  value: string;
}

const PasswordInput: FC<IPasswordInput> = ({
  value,
  onChange,
  placeholder,
  name,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };

  const handleVisibilityChange = () => {
    setIsVisible(prevIsVisible => !prevIsVisible);
  };

  return (
    <div className="PasswordInput">
      <input
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        value={value}
        type={isVisible ? 'text' : 'password'}
      />
      <Button
        onClick={handleVisibilityChange}
        className="PasswordInput__Button"
      >
        {isVisible ? <EyeSolidIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
};

export default PasswordInput;
