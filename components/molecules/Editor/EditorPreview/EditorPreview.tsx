import React, { FC } from 'react';

interface IEditorPreview {
  id: string;
  value: string;
  className?: string;
}

const EditorPreview: FC<IEditorPreview> = ({ className }) => {
  return (
    <div className={`Editor__Preview${className ? ` ${className}` : ''}`}></div>
  );
};

export default EditorPreview;
