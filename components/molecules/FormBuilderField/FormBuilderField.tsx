import './FormBuilderField.scss';
import { FieldType, FormType } from 'generated/graphql';
import { FC, memo } from 'react';
import { TextInputField } from '@spotted-zebra-uk/sz-ui-shared.widgets.text-input-field';
import { MultiselectFormField } from '@spotted-zebra-uk/sz-ui-shared.widgets.multiselect-form-field';
import { TMultiselectOption } from '@spotted-zebra-uk/sz-ui-shared.ui.multiselect';
import { TextArea } from '@spotted-zebra-uk/sz-ui-shared.ui.text-area';
import Datepicker from '../../../components/atoms/Datepicker/Datepicker';
import FieldLabelWithHint from '../../../components/atoms/FieldLabelWithHint/FieldLabelWithHint';
import FormField from '../../../components/atoms/FormField/FormField';
import Select, { TSelectOption } from '../../../components/atoms/Select/Select';
import { TFieldSettingsModel } from '../../../enums/formType';
import { TFormFieldValue } from '../../../interfaces/form';
import FloatingLabelTextArea from '../../atoms/FloatingLabelTextArea/FloatingLabelTextArea';

interface IFormBuilderField {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  options?: TSelectOption[] | undefined;
  onChange: (value: TFormFieldValue, name: string) => void;
  value: TFormFieldValue;
  error?: string | undefined;
  placeholder?: string;
  hint?: string;
  settings?: TFieldSettingsModel;
  formType?: FormType;
  isDisabled?: boolean;
  classNamePrefix: string;
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
  placeholder = '',
  hint = '',
  settings = {
    allowFreeText: true,
    searchable: false,
  },
  formType = FormType.CiForm,
  isDisabled = false,
  classNamePrefix,
}) => {
  const renderFormFieldElement = () => {
    if (type === FieldType.SingleSelectField) {
      return (
        <>
          <FieldLabelWithHint hint={hint} label={label} />

          <Select
            onChange={onChange}
            value={value as string}
            id={id}
            name={name}
            options={options || []}
            placeholder={placeholder}
            searchable={settings.searchable}
            createable={settings.allowFreeText}
            isDisabled={isDisabled}
            classNamePrefix={classNamePrefix}
          />
        </>
      );
    }
    if (type === FieldType.CompanyEmployeeSelectField) {
      return (
        <>
          <FieldLabelWithHint hint={hint} label={label} />

          <Select
            onChange={onChange}
            value={value as string}
            id={id}
            name={name}
            options={options || []}
            placeholder={placeholder}
            searchable={settings.searchable}
            createable={settings.allowFreeText}
            isDisabled={isDisabled}
            classNamePrefix={classNamePrefix}
          />
        </>
      );
    }

    if (type === FieldType.ShortTextField) {
      return (
        <TextInputField
          id={name}
          name={name}
          label={label}
          ariaLabel={label}
          value={value as string}
          disabled={isDisabled}
          onChange={onChange}
          bottomText={error}
          hasError={Boolean(error)}
          placeholder={label}
        />
      );
    }

    if (type === FieldType.DateField) {
      return (
        <>
          <FieldLabelWithHint hint={hint} label={label} />
          <Datepicker
            onChange={onChange}
            value={value as string}
            id={name}
            name={name}
            isDisabled={isDisabled}
          />
        </>
      );
    }

    if (type === FieldType.MultipleSelectField) {
      const selectedOptions: TMultiselectOption[] = (value as string[]).map(
        val => {
          return { value: val, label: val };
        }
      );

      return (
        <MultiselectFormField
          options={options || []}
          label={label}
          placeholder={label}
          id={name}
          value={selectedOptions}
          onChange={(value: TMultiselectOption<string>[]) => {
            onChange(
              value.map(option => option.value!),
              name
            );
          }}
        />
      );
    }
    if (type === FieldType.LongTextField && formType === FormType.TrForm) {
      return (
        <>
          <FloatingLabelTextArea
            onChange={onChange}
            value={value as string}
            id={name}
            name={name}
            hint={hint}
            isDisabled={isDisabled}
            label={label}
          />
        </>
      );
    }

    if (type === FieldType.LongTextField && formType !== FormType.TrForm) {
      return (
        <>
          <TextArea
            id={name}
            title={label}
            onChange={onChange}
            value={value as string}
            name={name}
            disabled={isDisabled}
            aria-label={label}
          />
        </>
      );
    }
  };

  if (
    type === FieldType.ShortTextField ||
    type === FieldType.MultipleSelectField ||
    (type === FieldType.LongTextField && formType !== FormType.TrForm)
  ) {
    return <>{renderFormFieldElement()}</>;
  }

  return (
    <>
      <FormField
        error={error}
        fieldName={name}
        label={label}
        isLabelVisible={
          formType === FormType.TrForm &&
          (FieldType.ShortTextField || FieldType.ShortTextField)
            ? false
            : true
        }
      >
        {renderFormFieldElement()}
      </FormField>
    </>
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

export default memo(FormBuilderField, areEqual);
