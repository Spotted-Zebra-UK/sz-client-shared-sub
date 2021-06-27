import Quill from 'quill';
import Delta from 'quill-delta';
import React, { FC, useEffect, useRef } from 'react';
import './EditorPreview.scss';

interface IEditorPreview {
  id: string;
  value: string;
  className?: string;
}

const EditorPreview: FC<IEditorPreview> = ({ value, id, className }) => {
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const editor = useRef<Quill>();

  useEffect(() => {
    if (editorWrapperRef.current) {
      editor.current = new Quill(editorWrapperRef.current, {
        modules: {
          toolbar: false,
        },
        readOnly: true,
        theme: 'snow',
      });
      const parsedValue: Delta = JSON.parse(value);
      editor.current.setContents(parsedValue);
    }
  });

  return (
    <div className={`Editor__Preview${className ? ` ${className}` : ''}`}>
      <div ref={editorWrapperRef} id={id} />
    </div>
  );
};

export default EditorPreview;
