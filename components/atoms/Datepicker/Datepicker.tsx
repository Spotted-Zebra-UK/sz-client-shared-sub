import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';
import { isArray } from 'lodash';
import moment from 'moment';
import { FC, forwardRef, RefObject } from 'react';
import DatePicker from 'react-datepicker';
import { DATE_FORMAT_DATE } from '../../../constants/dateFormats';
import IC_CALENDAR from 'icons/iconsSVG/ic_calendar_new.svg';

interface IDatepicker {
  className?: string;
  name: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  // For value is used YYYY-MM-DD format.
  value: string;
  isDisabled?: boolean;
  id?: string;
}

interface ICustomInput {
  value?: string;
  onClick?: () => {};
}

const Datepicker: FC<IDatepicker> = ({
  placeholder,
  value,
  onChange,
  className,
  isDisabled,
  name,
  id,
}) => {
  const CustomInput: FC<ICustomInput> = forwardRef((props, ref) => {
    return (
      <button
        className={`Datepicker__Button${
          !props.value ? ' Datepicker__Button--Placeholder' : ''
        }`}
        type="button"
        onClick={props.onClick}
        ref={
          ref as
            | string
            | ((instance: HTMLButtonElement | null) => void)
            | RefObject<HTMLButtonElement>
            | null
            | undefined
        }
      >
        {props.value || placeholder}
        {!props.value && (
          <img src={IC_CALENDAR} className="ic-calendar" alt="calendar-icon" />
        )}
      </button>
    );
  });

  const handleChange = (newDate: Date | [Date, Date] | null) => {
    const parsedNewDate =
      newDate && !isArray(newDate)
        ? moment(newDate.toISOString()).format(DATE_FORMAT_DATE)
        : '';

    onChange(parsedNewDate, name);
  };

  const parsedValue = value ? new Date(value) : null;

  return (
    <div className={`Datepicker${className ? ` ${className}` : ''}`}>
      <DatePicker
        selected={parsedValue}
        onChange={handleChange}
        placeholderText={placeholder}
        disabled={isDisabled}
        dateFormat="dd/MM/yyyy"
        customInput={<CustomInput />}
        showYearDropdown
        dropdownMode="select"
        isClearable
      />
    </div>
  );
};

export default Datepicker;
