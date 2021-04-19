import { isArray, isEmpty, isObject } from 'lodash';
import React, { FC } from 'react';
import { FieldType } from '../../../../../enums/form';
import { TFormFieldValue } from '../../../interfaces/form';
import Datepicker from '../../atoms/Datepicker/Datepicker';
import FormField from '../../atoms/FormField/FormField';
import Input from '../../atoms/Input/Input';
import Multiselect from '../../atoms/Multiselect/Multiselect';
import Select, { TSelectOption } from '../../atoms/Select/Select';
import Textarea from '../../atoms/Textarea/Textarea';

interface IFormBuilderField {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  options?: TSelectOption[];
  onChange: (value: TFormFieldValue, name: string) => void;
  value: TFormFieldValue;
  error?: string;
}

const FormBuilderField: FC<IFormBuilderField> = ({
  type,
  label,
  options,
  name,
  value,
  onChange,
  id,
  error,
}) => {
  const renderFormFieldElement = () => {
    if (type === FieldType.SINGLE_SELECT_FIELD) {
      return (
        <Select
          onChange={onChange}
          value={value as string}
          id={id}
          name={name}
          options={options || []}
          placeholder={label}
        />
      );
    }

    if (type === FieldType.SHORT_TEXT_FIELD) {
      return (
        <Input
          onChange={onChange}
          value={value as string}
          id={name}
          name={name}
          placeholder={label}
        />
      );
    }

    if (type === FieldType.DATE_FIELD) {
      return (
        <Datepicker
          onChange={onChange}
          value={value as string}
          id={name}
          name={name}
          placeholder={label}
        />
      );
    }

    if (type === FieldType.MULTIPLE_SELECT_FIELD) {
      return (
        <Multiselect
          onChange={onChange}
          value={value as string[]}
          id={name}
          name={name}
          options={options || []}
          placeholder={label}
        />
      );
    }

    if (type === FieldType.LONG_TEXT_FIELD) {
      return (
        <Textarea
          onChange={onChange}
          value={value as string}
          id={name}
          name={name}
          placeholder={label}
        />
      );
    }
  };

  const isLabelVisible =
    isArray(value) || isObject(value) ? !isEmpty(value) : Boolean(value);

  return (
    <FormField
      error={error}
      fieldName={name}
      label={label}
      isLabelVisible={isLabelVisible}
    >
      {renderFormFieldElement()}
    </FormField>
  );
};

const areEqual = (
  prevProps: IFormBuilderField,
  nextProps: IFormBuilderField
) => {
  if (
    prevProps.value !== nextProps.value ||
    prevProps.error !== nextProps.error
  ) {
    return false;
  }

  return true;
};

export default React.memo(FormBuilderField, areEqual);
