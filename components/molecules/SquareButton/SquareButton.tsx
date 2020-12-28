import './SquareButton.scss';
import React, { FC } from 'react';
import { TButtonType } from '../../../interfaces/button';
import { TColor } from '../../../interfaces/colors';
import Button from '../../atoms/Button/Button';
import SubmitButton from '../../atoms/SubmitButton/SubmitButton';

export interface ISquareButton {
  onClick?: (id?: string) => void;
  id?: string;
  className?: string;
  color?: TColor;
  isDisabled?: boolean;
  type?: TButtonType;
}

const SquareButton: FC<ISquareButton> = props => {
  const { color, type, children, className, ...restProps } = props;

  const parsedClassName = `SquareButton${
    className ? ` ${className}` : ''
  } SquareButton--${color || 'Green'}`;

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

export default SquareButton;
