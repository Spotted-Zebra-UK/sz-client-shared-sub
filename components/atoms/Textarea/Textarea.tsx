import './Textarea.scss';
import React, { FunctionComponent } from 'react';

interface ITextarea {
  className?: string;
  name: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  value: string;
  isDisabled?: boolean;
  id?: string;
  rows?: number;
}

// Related to $input-height - check _variables.scss
const DEFAULT_BASE_HEIGHT = 46;
const LINE_HEIGHT = 20;

const Textarea: FunctionComponent<ITextarea> = props => {
  const { value, onChange, className, isDisabled, name, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value, name);
  };

  const numberOfLineBreaks = (value.match(/\n/g) || []).length;
  const height = DEFAULT_BASE_HEIGHT + numberOfLineBreaks * LINE_HEIGHT;

  return (
    <textarea
      className={`Textarea${className ? ` ${className}` : ''}`}
      onChange={handleChange}
      value={value}
      disabled={isDisabled || false}
      style={{ height }}
      {...rest}
    />
  );
};

export default Textarea;
