import React, { forwardRef } from 'react';
import { ReactComponent as RedoIcon } from '../../../../icons/Redo.svg';
import { ReactComponent as UndoIcon } from '../../../../icons/Undo.svg';

interface IEditorDefaultToolbar {
  onUndo: () => void;
  onRedo: () => void;
}

const EditorDefaultToolbar = forwardRef<HTMLDivElement, IEditorDefaultToolbar>(
  ({ onUndo, onRedo }, ref) => {
    return (
      <div ref={ref}>
        <span className="ql-formats">
          <button onClick={onUndo}>
            <UndoIcon />
          </button>
          <button onClick={onRedo}>
            <RedoIcon />
          </button>
        </span>
        <span className="ql-formats">
          <select defaultValue="normal" className="ql-size">
            <option value="small"></option>
            <option value="normal"></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
        </span>
      </div>
    );
  }
);

export default EditorDefaultToolbar;
