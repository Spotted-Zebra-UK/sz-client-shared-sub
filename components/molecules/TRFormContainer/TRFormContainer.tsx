import './TRFormContainer.scss';
import { FieldType, FormType } from 'generated/graphql';
import _ from 'lodash';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import { MutationResult } from '@apollo/client';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import FormBuilderField from '../../../components/molecules/FormBuilderField/FormBuilderField';
import { useForm } from '../../../hooks/form';
import { ReactComponent as HintIcon } from '../../../icons/ic_info.svg';
import { TFormFieldValue } from '../../../interfaces/form';
import {
  IRespondantFormUpdateMutationResponse,
  TalentReviewFormField,
  TRespondantFormField,
} from '../../../interfaces/TalentReviewForm';

interface ITRFormContainer {
  fieldLayout: TalentReviewFormField;
  fields: TRespondantFormField[];
  onSubmit: (
    values: {
      [key in string]: TFormFieldValue;
    },
    fields: TRespondantFormField[]
  ) => void;
  isReadOnly: boolean;
  stageCandidateId?: number;
  onCloseHandler: () => void;
  handleSkipResponse?: () => void;
  saveRespondantFormResponse?: MutationResult<IRespondantFormUpdateMutationResponse>;
}

const TRFormContainer: FC<ITRFormContainer> = ({
  fieldLayout,
  fields,
  onSubmit,
  isReadOnly,
  onCloseHandler,
  saveRespondantFormResponse,
}) => {
  const { t } = useTranslation();
  const requiredFieldMessage = `^${t('common.thisFieldIsRequired')}`;

  const initialValues = useMemo(
    () =>
      fields.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr.initialValue ? curr.initialValue : '',
        }),
        {}
      ),
    [fields]
  );
  const validationShema = useMemo(
    () =>
      fields.reduce((acc, curr) => {
        if (curr.isOptional) {
          return acc;
        } else {
          if (curr.type === FieldType.SingleSelectField) {
            return {
              ...acc,
              [curr.id]: {
                presence: {
                  allowEmpty: false,
                  message: requiredFieldMessage,
                },
              },
            };
          }

          if (curr.type === FieldType.DateField) {
            return {
              ...acc,
              [curr.id]: {
                length: { minimum: 1, message: requiredFieldMessage },
              },
            };
          }

          return {
            ...acc,
            [curr.id]: {
              length: { minimum: 1, message: requiredFieldMessage },
            },
          };
        }
      }, {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields]
  );
  const [values, errors, handleChange, handleSubmit] = useForm({
    options: {
      initialValues,
      validationShema,
    },
    onSubmit: values => {
      onSubmit(values, fields);
    },
  });

  const formKey = 'tr';
  return (
    <form className="form-container">
      <div className="levels">
        {fieldLayout.levelFields.map(field => (
          <div
            className={`levels__field ${
              field.hint && field.hint.length > 0 ? 'hint' : ''
            }`}
            key={field.id}
          >
            <FormBuilderField
              placeholder="N/A"
              id={`${formKey}-${field.id}`}
              name={field.id.toString()}
              type={field.type}
              label={field.label}
              options={field.options}
              value={values[field.id]}
              error={errors && errors[field.id]}
              onChange={handleChange}
              hint={field.hint}
              settings={field.settings}
              formType={FormType.TrForm}
              isDisabled={isReadOnly}
              classNamePrefix={'tr'}
            />
          </div>
        ))}
      </div>
      <div className="roles">
        <ReactTooltip
          type="light"
          className="tooltip-container"
          effect="solid"
          multiline={true}
          place={'bottom'}
          id="q1"
        />

        <span className="roles__question" style={{ display: 'flex' }}>
          {' '}
          {'Which role this individual could be successor in future?'}
          <HintIcon
            className="hint-icon"
            data-for="q1"
            data-tip=" Which roles, within or outside your division, could this
                individual be a good candidate for in future?"
          />
        </span>

        <div className="roles__form">
          {fieldLayout.roleFields.map((field, index) => (
            <div
              className={`roles__form__field ${
                field.hint && field.hint.length > 0 ? 'hint' : ''
              }`}
              key={field.id}
            >
              <FormBuilderField
                id={`${formKey}-${field.id}`}
                placeholder={
                  index % 2 === 0 ? 'Select or enter a new role' : 'Ready In'
                }
                name={field.id.toString()}
                type={field.type}
                label={field.label}
                options={field.options}
                value={values[field.id]}
                error={errors && errors[field.id]}
                onChange={handleChange}
                hint={field.hint}
                settings={field.settings}
                formType={FormType.TrForm}
                isDisabled={isReadOnly}
                classNamePrefix={'tr'}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="roles">
        <span className="roles__question" style={{ display: 'flex' }}>
          {' '}
          {'Who might be a successor to the role you are assessing?'}{' '}
          <HintIcon
            data-for="q1"
            className="hint-icon"
            data-tip=" Is there someone who could step into this individual's position
            should they leave or move into another role?"
          />
        </span>

        <div className="successors__form">
          {fieldLayout.successorFields.map((field, index) => (
            <div
              className={`successors__form__field ${
                field.hint && field.hint.length > 0 ? 'hint' : ''
              } ${
                field.type === FieldType.CompanyEmployeeSelectField
                  ? 'employee-input'
                  : ''
              }`}
              key={field.id}
            >
              <FormBuilderField
                placeholder={
                  index % 2 === 0 ? 'Select or enter a new person' : 'Ready In'
                }
                id={`${formKey}-${field.id}`}
                name={field.id.toString()}
                type={field.type}
                label={field.label}
                options={field.options}
                value={values[field.id]}
                error={errors && errors[field.id]}
                onChange={handleChange}
                hint={field.hint}
                settings={field.settings}
                formType={FormType.TrForm}
                isDisabled={isReadOnly}
                classNamePrefix={'tr'}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="others">
        {fieldLayout.otherFields.map(field => (
          <div
            key={field.id}
            className={`${field.hint && field.hint.length > 0 ? 'hint' : ''} ${
              field.type === FieldType.CompanyEmployeeSelectField
                ? 'employee-input'
                : ''
            } `}
          >
            <FormBuilderField
              id={`${formKey}-${field.id}`}
              name={field.id.toString()}
              type={field.type}
              label={field.label}
              options={field.options}
              value={values[field.id]}
              error={errors && errors[field.id]}
              onChange={handleChange}
              hint={field.hint}
              settings={field.settings}
              formType={FormType.TrForm}
              isDisabled={isReadOnly}
              classNamePrefix={'tr'}
            />
          </div>
        ))}
      </div>
      <div className="actions">
        {isReadOnly ? (
          <Button variant="secondary" onClick={onCloseHandler}>
            Close
          </Button>
        ) : (
          <Button
            disabled={saveRespondantFormResponse?.loading}
            onClick={handleSubmit}
            type="submit"
          >
            {saveRespondantFormResponse?.loading
              ? 'Submitting...'
              : _.capitalize(t('common.next'))}
          </Button>
        )}
      </div>
    </form>
  );
};

export default TRFormContainer;
