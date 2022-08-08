import './SquareButton.scss';
import { FC } from 'react';
import { TColor } from '../../../interfaces/colors';

export interface ISquareButton {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void;
  id?: string;
  className?: string;
  color?: TColor;
  isDisabled?: boolean;
}

const SquareSubmitButton: FC<ISquareButton> = props => {
  const { color, children, className, onClick, ...restProps } = props;

  const parsedClassName = `SquareButton${
    className ? ` ${className}` : ''
  } SquareButton--${color || 'Green'}${
    restProps.isDisabled ? ' SquareButton--Disabled' : ''
  }`;

  return (
    <button
      onClick={onClick}
      type="button"
      className={parsedClassName}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default SquareSubmitButton;
