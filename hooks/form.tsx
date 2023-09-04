import { useState } from 'react';
import validate from '../helpers/validate';
import { TFormFieldValue } from '../interfaces/form';

export type TFormValues = {
  [key in string]: TFormFieldValue;
};

export type TFormErrors = {
  [key in string]: string;
};

interface IUseFormOptions {
  initialValues: TFormValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationShema?: any;
}

interface IUseFormProps {
  onSubmit: (values: TFormValues) => void;
  options: IUseFormOptions;
}

export const useForm = ({
  options,
  onSubmit,
}: IUseFormProps): [
  TFormValues,
  TFormErrors | undefined,
  (newValue: TFormFieldValue, name: string) => void,
  (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | undefined
  ) => void
] => {
  const [values, setValues] = useState<TFormValues>(options.initialValues);
  const [errors, setErrors] = useState<TFormErrors | undefined>();

  const validateForm = () => {
    if (!options.validationShema) {
      return undefined;
    }

    return validate(values, options.validationShema);
  };

  const handleChange = (newValue: TFormFieldValue, name: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: newValue }));

    if (errors && errors[name]) {
      setErrors(prevErrors => {
        return { ...prevErrors, [name]: '' };
      });
    }
  };

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | undefined
  ) => {
    event?.preventDefault();
    const newErrors = validateForm();
    if (!newErrors) {
      onSubmit(values);
    } else {
      setErrors(newErrors);
    }
  };

  return [values, errors, handleChange, handleSubmit];
};
