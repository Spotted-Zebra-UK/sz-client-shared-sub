import './TRFormContainer.scss';
import { FieldType, FormType } from 'generated/graphql';
import _ from 'lodash';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import FormBuilderField from '../../../components/molecules/FormBuilderField/FormBuilderField';
import { useForm } from '../../../hooks/form';
import { TFormFieldValue } from '../../../interfaces/form';
import {
  TalentReviewFormField,
  TRespondantFormField,
} from '../../../interfaces/TalentReviewForm';
import SquareButton from '../SquareButton/SquareButton';

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
  stageId: string;
  onCloseHandler: () => void;
}

const TRFormContainer: FC<ITRFormContainer> = ({
  fieldLayout,
  fields,
  onSubmit,
  isReadOnly,
  stageId,
  onCloseHandler,
}) => {
  const { t } = useTranslation();
  const requiredFieldMessage = `^${t('common.thisFieldIsRequired')}`;
  const history = useHistory();

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
      history.push(`/stages/${stageId}`);
    },
  });

  const formKey = 'tr';
  return (
    <form onSubmit={handleSubmit} className="form-container">
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
            />
          </div>
        ))}
      </div>
      <div className="roles">
        <p className="roles__question">
          {'Which role this individual could be successor in future?'}
        </p>
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
                placeholder={index % 2 === 0 ? 'Select Role' : 'Ready In'}
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
              />
            </div>
          ))}
        </div>
      </div>
      <div className="roles">
        <p className="roles__question">
          {'Who might be a successor to the role you are assessing?'}
        </p>
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
                placeholder={index % 2 === 0 ? 'Find By Email' : 'Ready In'}
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
            />
          </div>
        ))}
      </div>
      <div className="actions">
        {isReadOnly ? (
          <SquareButton color="White" onClick={onCloseHandler}>
            Close
          </SquareButton>
        ) : (
          <SquareButton type="submit">
            {_.capitalize(t('common.next'))}
          </SquareButton>
        )}
      </div>
    </form>
  );
};

export default TRFormContainer;
