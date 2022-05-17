/* eslint-disable jsx-a11y/label-has-associated-control */
import './FloatingLabelTextArea.scss';
import { FC, useEffect, useRef, useState } from 'react';
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight('auto');
    setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
    setText(event.target.value);
    onChange(event.target.value, name);
  };
  useEffect(() => {
    setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [text]);
  return (
    <div
      className="floating-label-container"
      style={{
        minHeight: parentHeight,
      }}
    >
      <textarea
        id="input-text"
        className={`custom-input ${value && 'filled'}`}
        name={name}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        disabled={isDisabled || false}
        ref={textAreaRef}
        style={{
          height: textAreaHeight,
        }}
        rows={1}
        {...rest}
      />
      <div className="label">
        {hint ? <FieldLabelWithHint hint={hint} label={label} /> : label}
      </div>
    </div>
  );
};

export default FloatingLabelTextArea;
