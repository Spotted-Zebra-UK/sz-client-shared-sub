import { gql } from '@apollo/client';

// TODO: Refactor, use generated query instead of this.
export const RESPONDANT_FORM_QUERY = gql`
  query RespondantFormCompletedCheck(
    $associatedId: Int!
    $formOwnerId: Int!
    $formType: FormType!
    $respondantId: Int
  ) {
    respondantForm: RespondantForm(
      associatedId: $associatedId
      formOwnerId: $formOwnerId
      formType: $formType
      respondantId: $respondantId
    ) {
      isComplete
      submittedFormLogId
      formType
      formOwnerId
      associatedId
      formId
      respondantFieldWithAnswers {
        field {
          id
          question
          hint
          settings {
            allowFreeText
            searchable
          }
          isArchived
          fieldType
          ... on CompanyEmployeeSelectField {
            dynamicSelectOptions
          }
          ... on MultiSelectField {
            selectOptions
          }
          ... on SingleSelectField {
            selectOptions
          }
        }
        displayOrder
        isOptional
        answer
        selectOptionAnswerIsFreeText
      }
    }
  }
`;

// TODO: Refactor, use generated query instead of this.
export const RESPONDANT_FORM_UPDATE_MUTATION = gql`
  mutation RespondantFormUpdate(
    $associatedId: Int!
    $formOwnerId: Int!
    $formType: FormType!
    $answers: [UpdateRespondantFormAnswerArgs!]
  ) {
    respondantForm: RespondantFormUpdate(
      associatedId: $associatedId
      formOwnerId: $formOwnerId
      formType: $formType
      answers: $answers
    ) {
      isComplete
      submittedFormLogId
      formType
      formOwnerId
      associatedId
      formId
      respondantFieldWithAnswers {
        field {
          id
          question
          hint
          settings {
            allowFreeText
            searchable
          }
          isArchived
          fieldType
          ... on CompanyEmployeeSelectField {
            dynamicSelectOptions
          }
          ... on MultiSelectField {
            selectOptions
          }
          ... on SingleSelectField {
            selectOptions
          }
        }
        displayOrder
        isOptional
        answer
        selectOptionAnswerIsFreeText
      }
    }
  }
`;
