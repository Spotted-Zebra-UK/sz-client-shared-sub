/* eslint-disable jsx-a11y/label-has-associated-control */
import './FloatingLabelTextArea.scss';
import { FC, useEffect, useRef } from 'react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    onChange(event.currentTarget.value, name);
    setHeight();
  };
  useEffect(() => {
    setHeight();
  }, [value]);

  function setHeight() {
    let elem = textareaRef.current;
    if (!elem) return;
    const style = getComputedStyle(elem, null);
    const verticalBorders = Math.round(
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
    );
    const maxHeight = parseFloat(style.maxHeight) || 300;

    elem.style.height = 'auto';

    const newHeight = elem.scrollHeight + verticalBorders;
    console.log('newHeight', newHeight);
    elem.style.overflowY = newHeight > maxHeight ? 'auto' : 'hidden';
    elem.style.height = Math.min(newHeight, maxHeight) + 'px';
  }

  return (
    <div className="floating-label-container">
      <textarea
        id="textarea"
        onInput={handleChange}
        className={`custom-textarea ${
          value && value.length > 0 ? 'filled' : ''
        }`}
        ref={textareaRef}
        value={value}
        disabled={isDisabled || false}
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
