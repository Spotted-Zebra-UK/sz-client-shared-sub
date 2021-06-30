import './Editor.scss';
import Quill, { QuillOptionsStatic } from 'quill';
import Delta from 'quill-delta';
import React, { FC, useEffect, useRef, useState } from 'react';

export interface IEditor {
  id: string;
  onChange: (id: string, value: string) => void;
  onFocus?: (id: string, value: string) => void;
  onBlur?: (id: string, value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string;
  className?: string;
  toolbarOptions?: QuillOptionsStatic | undefined;
}

const defaultOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
    ],
  },
  theme: 'snow',
};

const Editor: FC<IEditor> = ({
  id,
  value,
  onChange,
  onFocus,
  onBlur,
  toolbarOptions,
  className,
}) => {
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const editor = useRef<Quill>();
  const [isFocused, setFocused] = useState(false);

  const handleChange = () => {
    if (editor.current) {
      const newValue = JSON.stringify(editor.current.getContents());
      onChange(id, newValue);
    }
  };

  const handleChangeSelection = () => {
    if (editor.current) {
      setFocused(editor.current.hasFocus());
      if (editor.current.hasFocus()) {
        if (onFocus) {
          const currentValue = JSON.stringify(editor.current.getContents());
          onFocus(id, currentValue);
        }
      } else {
        if (onBlur) {
          const currentValue = JSON.stringify(editor.current.getContents());
          onBlur(id, currentValue);
        }
      }
    }
  };

  useEffect(() => {
    if (editorWrapperRef.current) {
      editor.current = new Quill(
        editorWrapperRef.current,
        toolbarOptions || defaultOptions
      );
      const parsedValue: Delta = JSON.parse(value || '{}');
      editor.current.setContents(parsedValue);
      editor.current.on('text-change', handleChange);
      editor.current.on('selection-change', handleChangeSelection);
    }

    return () => {
      if (editor.current) {
        editor.current.off('text-change', handleChange);
        editor.current.off('selection-change', handleChangeSelection);
        editor.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`Editor${isFocused ? ' Editor--Focused' : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      <div ref={editorWrapperRef} id={id} />
    </div>
  );
};

export default Editor;
