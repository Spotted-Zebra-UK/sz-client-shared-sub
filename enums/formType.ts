export enum FieldType {
  SINGLE_SELECT_FIELD = 'SINGLE_SELECT_FIELD',
  MULTIPLE_SELECT_FIELD = 'MULTIPLE_SELECT_FIELD',
  SHORT_TEXT_FIELD = 'SHORT_TEXT_FIELD',
  LONG_TEXT_FIELD = 'LONG_TEXT_FIELD',
  DATE_FIELD = 'DATE_FIELD',
  COMPANY_EMPLOYEE_SELECT_FIELD = 'COMPANY_EMPLOYEE_SELECT_FIELD',
}
export type TFieldSettingsModel = {
  __typename?: string;
  allowFreeText: boolean;
  searchable: boolean;
};
