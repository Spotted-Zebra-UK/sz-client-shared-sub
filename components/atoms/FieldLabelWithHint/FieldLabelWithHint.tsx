import './FieldLabelWithHint.scss';
import { FC } from 'react';
import { ReactComponent as HintIcon } from './ic_info.svg';

interface IFieldLabelWithHint {
  label: string;
  hint: string;
}

const FieldLabelWithHint: FC<IFieldLabelWithHint> = ({ label, hint }) => {
  return (
    <div className="form-label-with-hint">
      <div className="tool_tip">
        {label}
        <div className="help-tip">
          {' '}
          <HintIcon className="hint-icon" />
          <p dangerouslySetInnerHTML={{ __html: hint || '' }}></p>{' '}
        </div>
      </div>
    </div>
  );
};
export default FieldLabelWithHint;
