import React, { FC } from 'react';
import { TButtonType } from '../../../interfaces/button';
import { TColor } from '../../../interfaces/colors';
import Button from '../../atoms/Button/Button';
import SubmitButton from '../../atoms/SubmitButton/SubmitButton';
import './TextButton.scss';

interface ITextButton {
  onClick?: (id?: string) => void;
  id?: string;
  className?: string;
  color?: TColor;
  isDisabled?: boolean;
  type?: TButtonType;
}

const TextButton: FC<ITextButton> = props => {
  const { color, type, children, className, ...restProps } = props;

  const parsedClassName = `TextButton${
    className ? ` ${className}` : ''
  } TextButton--${color || 'Green'}${
    restProps.isDisabled ? ' TextButton--Disabled' : ''
  }`;

  if (type === 'submit') {
    return (
      <SubmitButton className={parsedClassName} {...restProps}>
        {children}
      </SubmitButton>
    );
  }

  return (
    <Button className={parsedClassName} {...restProps}>
      {children}
    </Button>
  );
};

export default TextButton;
