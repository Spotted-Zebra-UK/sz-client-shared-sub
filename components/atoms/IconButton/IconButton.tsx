import './IconButton.scss';
import React, { FC } from 'react';
import Button, { IButton } from '../Button/Button';

interface IIconButton extends IButton {}

const IconButton: FC<IIconButton> = ({ className, children, ...restProps }) => {
  return (
    <Button className={`IconButton ${className}`} {...restProps}>
      {children}
    </Button>
  );
};

export default IconButton;
