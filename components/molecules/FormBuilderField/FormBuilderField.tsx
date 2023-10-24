import { FieldType, FormType } from 'generated/graphql';
import { FC, memo, useState } from 'react';
import { TMultiselectOption } from '@spotted-zebra-uk/sz-ui-shared.ui.multiselect';
import { TSelectOption } from '@spotted-zebra-uk/sz-ui-shared.ui.select';
import { TextArea } from '@spotted-zebra-uk/sz-ui-shared.ui.text-area';
import { Datepicker } from '@spotted-zebra-uk/sz-ui-shared.widgets.datepicker';
import { MultiselectFormField } from '@spotted-zebra-uk/sz-ui-shared.widgets.multiselect-form-field';
import { SelectFormField } from '@spotted-zebra-uk/sz-ui-shared.widgets.select-form-field';
import { TextInputField } from '@spotted-zebra-uk/sz-ui-shared.widgets.text-input-field';
import FormField from '../../../components/atoms/FormField/FormField';
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
  autoComplete?: string;
  className: string;
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
    searchable: true,
  },
  formType = FormType.CiForm,
  isDisabled = false,
  autoComplete,
  className,
}) => {
  const getMultiSelectInitialValues = () => {
    if (type === FieldType.MultipleSelectField && options) {
      const values = value as string[];

      return options.filter(option => values.includes(option.value));
    }

    return [];
  };

  // To keep track of selected options in order to fix problems with
  // focus. Since we need to map TMultiselectOption to TFormFieldValue,
  // that mapping breaks focus on selected elements.
  const [selectedOptions, setSelectedOptions] = useState<TMultiselectOption[]>(
    getMultiSelectInitialValues()
  );

  const renderFormFieldElement = () => {
    if (
      type === FieldType.SingleSelectField ||
      type === FieldType.CompanyEmployeeSelectField
    ) {
      const valueString = value as string;

      return (
        <SelectFormField
          label={label}
          placeholder={label}
          onChange={(value: TSelectOption<string>) => {
            onChange(value.value, name);
          }}
          value={{ value: valueString, label: valueString }}
          id={id}
          name={name}
          options={options || []}
          isSearchable={settings?.searchable}
          isDisabled={isDisabled}
          className={className}
          hasError={!!error}
          bottomText={error}
        />
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
          autoComplete={autoComplete}
        />
      );
    }

    if (type === FieldType.DateField) {
      return (
        <>
          <Datepicker
            onDateChange={(value: string) => {
              onChange(value, name);
            }}
            date={value as string}
            id={name}
            name={name}
            isDisabled={isDisabled}
            customPlaceholder={label}
            label={label}
            hasError={Boolean(error)}
            bottomText={error}
          />
        </>
      );
    }

    if (type === FieldType.MultipleSelectField) {
      return (
        <MultiselectFormField
          options={options || []}
          label={label}
          placeholder={label}
          id={name}
          value={selectedOptions}
          onChange={(value: TMultiselectOption<string>[]) => {
            setSelectedOptions(value);
            onChange(
              value.map(option => option.value!),
              name
            );
          }}
          hasError={!!error}
          bottomText={error}
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
            autoComplete={autoComplete}
            hasError={!!error}
            errorText={error}
          />
        </>
      );
    }
  };

  if (
    type === FieldType.ShortTextField ||
    type === FieldType.MultipleSelectField ||
    (type === FieldType.LongTextField && formType !== FormType.TrForm) ||
    type === FieldType.SingleSelectField ||
    type === FieldType.CompanyEmployeeSelectField ||
    type === FieldType.DateField
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
