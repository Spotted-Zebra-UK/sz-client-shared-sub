import './FieldLabelWithHint.scss';
import { ReactComponent as HintIcon } from 'assets/icons/ic_info.svg';
import { FC } from 'react';

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
