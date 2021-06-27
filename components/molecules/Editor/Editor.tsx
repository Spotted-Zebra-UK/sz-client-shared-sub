import React, { FC, useEffect, useRef, useState } from 'react';
import Quill, { QuillOptionsStatic } from 'quill';
import Delta from 'quill-delta';
import './Editor.scss';

export interface IEditor {
  id: string;
  onChange: (id: string, value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string;
  className?: string;
  toolbarOptions?: QuillOptionsStatic | undefined;
}

const defaultOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['clean'],
    ],
  },
  theme: 'snow',
};

const Editor: FC<IEditor> = ({
  id,
  value,
  onChange,
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
    }
  };

  useEffect(() => {
    if (editorWrapperRef.current) {
      editor.current = new Quill(
        editorWrapperRef.current,
        toolbarOptions || defaultOptions
      );
      editor.current.on('text-change', handleChange);
      editor.current.on('selection-change', handleChangeSelection);
      const parsedValue: Delta = JSON.parse(value || '{}');
      editor.current.setContents(parsedValue);
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
