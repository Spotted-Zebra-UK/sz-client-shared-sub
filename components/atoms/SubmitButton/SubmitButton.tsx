import React, { FunctionComponent } from 'react';

interface ISubmitButton {
  className?: string;
  isDisabled?: boolean;
}

const SubmitButton: FunctionComponent<ISubmitButton> = ({
  children,
  className,
  isDisabled = false,
}) => {
  return (
    <button
      className={`SubmitButton${className ? ` ${className}` : ''}`}
      type="submit"
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
