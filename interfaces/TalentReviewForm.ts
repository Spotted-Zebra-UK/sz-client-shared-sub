import {
  FieldInstanceType,
  FieldType,
  FormManagerType,
  FormType,
} from '../../../generated/graphql';
import { TSelectOption } from '../components/atoms/Select/Select';

export type TRespondantFormField = {
  id: string;
  type: FieldType;
  label: string;
  initialValue: string;
  options?: TSelectOption[];
  isOptional: boolean;
  hint?: string;
  settings: TFieldSettingsModel;
};

export type TalentReviewFormField = {
  levelFields: TRespondantFormField[];
  roleFields: TRespondantFormField[];
  successorFields: TRespondantFormField[];
  otherFields: TRespondantFormField[];
};

export type TRespondantFieldWithAnswer = {
  field: TFormFieldBaseGQL;
  displayOrder: number;
  isOptional: boolean;
  answer: string;
  selectOptionAnswerIsFreeText?: boolean;
};
// Test Commit
export type TRespondantForm = {
  submittedFormLogId: number;
  formType: FormType;
  formOwnerId: number;
  associatedId: number;
  formId: number;
  respondantFieldWithAnswers: TRespondantFieldWithAnswer[];
  isComplete: boolean;
};

export type TUpdateRespondantFormAnswerArgs = {
  response: string;
  fieldId: number;
};

export interface IRespondantFormQueryResponse {
  respondantForm: TRespondantForm;
}

export interface IRespondantFormQueryInput {
  associatedId: number;
  formOwnerId: number;
  formType: FormType;
  respondantId?: number;
}

export interface IRespondantFormUpdateMutationResponse {
  respondantForm: TRespondantForm;
}

export interface IRespondantFormUpdateMutationInput {
  associatedId: number;
  formOwnerId: number;
  formType: FormType;
  answers: TUpdateRespondantFormAnswerArgs[];
}

export interface IFormQueryResponse {
  form: TFormGQL;
}

export interface IFormQueryInput {
  id: number;
}
export type TFormGQL = {
  id: number;
  formType: FormType;
  formManagerType: FormManagerType;
  name: string;
  formOwner: TFormOwnerGQL;
  formFields: TFormFieldGQL[];
  formOwnerName: string;
};

export type TFormOwnerGQL = {
  id: number;
  formOwnerId: number;
};

export type TFormFieldGQL = {
  id: number;
  displayOrder: number;
  isOptional: boolean;
  field: TFormFieldBaseGQL;
  __typename?: string;
};

export type TFormFieldBaseGQL = {
  id: number;
  fieldType: FieldType;
  formManagerType: FormManagerType;
  fieldInstanceType: FieldInstanceType;
  name: string;
  question?: string;
  selectOptions?: string;
  dynamicSelectOptions?: string;
  isArchived: boolean;
  txtData?: string;
  settings?: TFieldSettingsModel;
  hint?: string;

  __typename?: string;
};
export type TFieldSettingsModel = {
  __typename?: string;
  allowFreeText: boolean;
  searchable: boolean;
};
