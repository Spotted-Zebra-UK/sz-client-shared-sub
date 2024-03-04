import {
  FieldType,
  FormType,
  StageCandidateFindOneDocument,
  StageCandidateFindOneQuery,
  StageCandidateFindOneQueryVariables,
} from 'generated/graphql';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import {
  ApolloQueryResult,
  MutationResult,
  QueryResult,
  useApolloClient,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  API_DATE_FORMAT_DATE,
  DATE_FORMAT_DATE,
} from '../constants/dateFormats';
import {
  RESPONDANT_FORM_QUERY,
  RESPONDANT_FORM_UPDATE_MUTATION,
} from '../graphql/form/respondantForm';
import { TFormFieldValue } from '../interfaces/form';
import {
  IRespondantFormQueryInput,
  IRespondantFormQueryResponse,
  IRespondantFormUpdateMutationInput,
  IRespondantFormUpdateMutationResponse,
  TRespondantFormField,
} from '../interfaces/TalentReviewForm';

export const useGetStageCompanyRespondantForm = () => {
  const client = useApolloClient();

  /**
   * If candidate did not completed company request form or form is
   * updated since last completition. Form should be visible.
   */
  return async (
    stageCandidateId: number,
    formType: FormType
  ): Promise<ApolloQueryResult<IRespondantFormQueryResponse> | null> => {
    const stageCandidateQueryResponse = await client.query<
      StageCandidateFindOneQuery,
      StageCandidateFindOneQueryVariables
    >({
      query: StageCandidateFindOneDocument,
      variables: {
        id: stageCandidateId,
      },
    });

    if (
      stageCandidateQueryResponse.data &&
      stageCandidateQueryResponse.data.StageCandidateFindOne?.companyId
    ) {
      const stageCompanyId =
        stageCandidateQueryResponse.data.StageCandidateFindOne?.companyId;

      return client.query<
        IRespondantFormQueryResponse,
        IRespondantFormQueryInput
      >({
        query: RESPONDANT_FORM_QUERY,
        variables: {
          associatedId: stageCompanyId,
          formOwnerId: stageCompanyId,
          formType,
        },
      });
    }
    return null;
  };
};

export const useGetStageCompanyRespondantFormEffect = (
  stageCandidateId: number,
  formType: FormType,
  onCompleted: (
    value: ApolloQueryResult<IRespondantFormQueryResponse> | null
  ) => void
) => {
  const getRespondantForm = useGetStageCompanyRespondantForm();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] =
    useState<ApolloQueryResult<IRespondantFormQueryResponse> | null>();

  useEffect(() => {
    const candidateCompanyRequestCheckWrapper = async () => {
      try {
        const getRespondantFormResult = await getRespondantForm(
          stageCandidateId,
          formType
        );

        onCompleted(getRespondantFormResult);
        setResult(getRespondantFormResult);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    candidateCompanyRequestCheckWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageCandidateId]);

  return [result, isLoading];
};

interface IUseRespondantForm {
  onGetRespondantFormPreviouslyCompleted?: () => void;
  onSaveRespondantFormCompleted?: () => void;
  associatedId: number;
  formOwnerId: number;
  formType: FormType;
  respondantId?: number;
}

interface ISelectOption {
  label: string;
  value: string;
}

const useRespondantForm = ({
  onGetRespondantFormPreviouslyCompleted,
  onSaveRespondantFormCompleted,
  associatedId,
  formOwnerId,
  formType,
  respondantId,
}: IUseRespondantForm): [
  QueryResult<IRespondantFormQueryResponse, IRespondantFormQueryInput>,
  TRespondantFormField[] | undefined,
  (formValues: {
    [key in string]: TFormFieldValue;
  }) => void,
  () => void,
  MutationResult<IRespondantFormUpdateMutationResponse>
] => {
  const getRespondantFormQueryResponse = useQuery<
    IRespondantFormQueryResponse,
    IRespondantFormQueryInput
  >(RESPONDANT_FORM_QUERY, {
    variables: {
      associatedId,
      formOwnerId,
      formType,
      respondantId,
    },
    onError: () => {},
    onCompleted: data => {
      if (
        (!data || !data.respondantForm || data.respondantForm.isComplete) &&
        onGetRespondantFormPreviouslyCompleted
      ) {
        onGetRespondantFormPreviouslyCompleted();
      }
    },
  });

  const getRespondantFormFields = (data?: IRespondantFormQueryResponse) => {
    if (!data || !data.respondantForm) {
      return undefined;
    }

    const { respondantForm } = data;

    return respondantForm.respondantFieldWithAnswers.reduce((acc, curr) => {
      if (curr.field.isArchived) {
        return acc;
      }

      let initialValue;

      if (curr.field.fieldType === FieldType.MultipleSelectField) {
        initialValue = curr.answer ? JSON.parse(curr.answer) : [];
      } else if (curr.field.fieldType === FieldType.DateField) {
        initialValue = curr.answer
          ? moment(curr.answer, 'DD-MM-YYYY').format(DATE_FORMAT_DATE)
          : '';
      } else {
        initialValue = curr.answer || '';
      }
      let options: ISelectOption[] | undefined =
        curr.field.fieldType === FieldType.CompanyEmployeeSelectField
          ? curr.field.dynamicSelectOptions
            ? (
                JSON.parse(curr.field.dynamicSelectOptions) as {
                  options: {
                    employeeId: string;
                    name: string;
                  }[];
                }
              ).options.map(option => ({
                label: option.name,
                value: option.employeeId,
              }))
            : undefined
          : curr.field.selectOptions
          ? (
              JSON.parse(curr.field.selectOptions) as {
                options: string[];
              }
            ).options
              .filter(option => option && option.length > 0)
              .map(option => ({ label: option, value: option }))
          : undefined;
      if (curr.selectOptionAnswerIsFreeText) {
        options?.push({ label: curr.answer, value: curr.answer });
      }
      const field = {
        id: `${curr.field.id}`,
        label: `${curr.field.question}${curr.isOptional ? '' : ' *'}`,
        type: curr.field.fieldType,
        hint: curr.field.hint,
        isOptional: curr.isOptional,
        settings: curr.field.settings,
        options,
        initialValue:
          !curr.isOptional && initialValue.length === 0
            ? options
              ? options[0].value
              : ''
            : initialValue,
      };

      return [...acc, field] as TRespondantFormField[];
    }, [] as TRespondantFormField[]);
  };

  const formFields: TRespondantFormField[] | undefined = useMemo(
    () => getRespondantFormFields(getRespondantFormQueryResponse.data),
    [getRespondantFormQueryResponse.data]
  );

  const [saveRespondantForm, saveRespondantFormResponse] = useMutation<
    IRespondantFormUpdateMutationResponse,
    IRespondantFormUpdateMutationInput
  >(RESPONDANT_FORM_UPDATE_MUTATION, {
    onError: () => {},
    onCompleted: () => {
      if (onSaveRespondantFormCompleted) {
        onSaveRespondantFormCompleted();
      }
    },
    update(cache, { data }) {
      if (data) {
        const { respondantForm } = data;
        cache.writeQuery({
          query: RESPONDANT_FORM_QUERY,
          variables: {
            associatedId,
            formOwnerId,
            formType,
          },
          data: { respondantForm },
        });
      }
    },
  });

  const handleSaveRespondantForm = (formValues: {
    [key in string]: TFormFieldValue;
  }) => {
    if (formFields) {
      saveRespondantForm({
        variables: {
          associatedId,
          formOwnerId,
          formType,
          answers: formFields
            .filter(field => formValues[field.id])
            .map(field => {
              const fieldAnswerValue = formValues[field.id];

              if (field.type === FieldType.MultipleSelectField) {
                return {
                  response: JSON.stringify(fieldAnswerValue) as string,
                  fieldId: +field.id,
                };
              }

              if (field.type === FieldType.DateField) {
                return {
                  response: moment(
                    new Date(fieldAnswerValue as string).toISOString()
                  ).format(API_DATE_FORMAT_DATE),
                  fieldId: +field.id,
                };
              }

              return {
                response: fieldAnswerValue as string,
                fieldId: +field.id,
              };
            }),
        },
      });
    }
  };

  const handleSkipRespondantForm = () => {
    saveRespondantForm({
      variables: {
        associatedId,
        formOwnerId,
        formType,
        answers: [],
      },
    });
  };

  return [
    getRespondantFormQueryResponse,
    formFields,
    handleSaveRespondantForm,
    handleSkipRespondantForm,
    saveRespondantFormResponse,
  ];
};

export default useRespondantForm;
