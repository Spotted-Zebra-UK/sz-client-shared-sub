import './Editor.scss';
//TODO - YL-182
// import Quill, { QuillOptionsStatic } from 'quill';
// import Delta from 'quill-delta';
// import React, { FC, useEffect, useRef, useState } from 'react';
// import EditorDefaultToolbar from './EditorDefaultToolbar/EditorDefaultToolbar';
import { FC } from 'react';

export interface IEditor {
  id: string;
  onChange: (id: string, value: string) => void;
  onFocus?: (id: string, value: string) => void;
  onBlur?: (id: string, value: string) => void;
  value: string;
  className?: string;
  // toolbarOptions?: QuillOptionsStatic | undefined;
  ToolbarComponent?: React.ForwardRefExoticComponent<
    {
      onUndo?: () => void;
      onRedo?: () => void;
    } & React.RefAttributes<HTMLDivElement>
  >;
}

const Editor: FC<IEditor> = ({
  // id,
  // value,
  // onChange,
  // onFocus,
  // onBlur,
  // toolbarOptions,
  className,
  // ToolbarComponent,
}) => {
  // const editorWrapperRef = useRef<HTMLDivElement>(null);
  // const editorToolbarRef = useRef<HTMLDivElement>(null);
  // const editor = useRef<Quill>();
  // const [isFocused, setFocused] = useState(false);

  // const handleChange = () => {
  //   if (editor.current) {
  //     const newValue = JSON.stringify(editor.current.getContents());
  //     onChange(id, newValue);
  //   }
  // };

  // const handleChangeSelection = () => {
  //   if (editor.current) {
  //     setFocused(editor.current.hasFocus());
  //     if (editor.current.hasFocus()) {
  //       if (onFocus) {
  //         const currentValue = JSON.stringify(editor.current.getContents());
  //         onFocus(id, currentValue);
  //       }
  //     } else {
  //       if (onBlur) {
  //         const currentValue = JSON.stringify(editor.current.getContents());
  //         onBlur(id, currentValue);
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (editorWrapperRef.current && editorToolbarRef.current) {
  //     const defaultOptions = {
  //       modules: {
  //         history: {
  //           delay: 2000,
  //           maxStack: 500,
  //           userOnly: true,
  //         },
  //         toolbar: editorToolbarRef.current,
  //       },
  //       theme: 'snow',
  //     };

  //     editor.current = new Quill(
  //       editorWrapperRef.current,
  //       toolbarOptions || defaultOptions
  //     );
  //     const parsedValue: Delta = JSON.parse(value || '{}');
  //     editor.current.setContents(parsedValue);
  //     editor.current.on('text-change', handleChange);
  //     editor.current.on('selection-change', handleChangeSelection);
  //   }

  //   return () => {
  //     if (editor.current) {
  //       editor.current.off('text-change', handleChange);
  //       editor.current.off('selection-change', handleChangeSelection);
  //       editor.current = undefined;
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleUndo = () => {
  //   if (editor.current) {
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (editor.current as any).history.undo();
  //   }
  // };

  // const handleRedo = () => {
  //   if (editor.current) {
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (editor.current as any).history.redo();
  //   }
  // };

  return (
    <div
      className={`Editor${className ? ` ${className}` : ''}`}
      // className={`Editor${isFocused ? ' Editor--Focused' : ''}${
      //   className ? ` ${className}` : ''
      // }`}
    >
      {/* {ToolbarComponent === undefined ? (
        <EditorDefaultToolbar
          ref={editorToolbarRef}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
      ) : (
        <ToolbarComponent
          ref={editorToolbarRef}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
      )}
      <div ref={editorWrapperRef} id={id} /> */}
    </div>
  );
};

export default Editor;
