import React, { FunctionComponent } from 'react';

export interface IButton {
  onClick?: (id?: string) => void;
  id?: string;
  className?: string;
  isDisabled?: boolean;
}

const Button: FunctionComponent<IButton> = ({
  children,
  onClick,
  id,
  className,
  isDisabled,
}) => {
  const handleClick = () => {
    if (onClick) {
      if (id) {
        onClick(id);
      } else {
        onClick();
      }
    }
  };

  return (
    <button
      className={`Button${className ? ` ${className}` : ''}`}
      type="button"
      onClick={handleClick}
      id={id}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
