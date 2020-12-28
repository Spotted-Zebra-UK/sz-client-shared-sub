export type TTextFromFieldValue = string;
export type TSelectFormFieldOptionValue = string | number | undefined;
export type TSelectFormFieldValue =
  | string
  | number
  | undefined
  | string[]
  | number[];
export type TCheckboxFormFieldValue = boolean;
export type TFormFieldValue =
  | TSelectFormFieldValue
  | TTextFromFieldValue
  | TCheckboxFormFieldValue;
