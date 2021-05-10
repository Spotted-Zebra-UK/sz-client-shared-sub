import './ContainedButton.scss';
import React, { FC } from 'react';
import { TButtonType } from '../../../interfaces/button';
import SubmitButton from '../../atoms/SubmitButton/SubmitButton';
import Button from '../../atoms/Button/Button';
import Loader from '../../atoms/Loader/Loader';

export interface IContainedButton {
  onClick?: (id?: string) => void;
  id?: string;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  color?: 'Primary' | 'Secondary' | 'Tertiary';
  type?: TButtonType;
}

const ContainedButton: FC<IContainedButton> = props => {
  const {
    color = 'Primary',
    type,
    children,
    className,
    isLoading,
    isDisabled,
    ...restProps
  } = props;
  let parsedClassName = 'ContainedButton';

  parsedClassName = `${parsedClassName} ContainedButton--${color}`;
  parsedClassName = isDisabled
    ? `${parsedClassName} ContainedButton--Disabled`
    : parsedClassName;
  parsedClassName = className
    ? `${parsedClassName} ${className}`
    : parsedClassName;
  parsedClassName = isLoading
    ? `${parsedClassName} ContainedButton--Loading ContainedButton--Loading--${color}`
    : parsedClassName;

  if (isLoading) {
    return (
      <Button isDisabled className={parsedClassName} {...restProps}>
        <Loader color={color} />
      </Button>
    );
  }

  if (type === 'submit') {
    return (
      <SubmitButton isDisabled className={parsedClassName} {...restProps}>
        {children}
      </SubmitButton>
    );
  }

  return (
    <Button isDisabled={isDisabled} className={parsedClassName} {...restProps}>
      {children}
    </Button>
  );
};

export default ContainedButton;
