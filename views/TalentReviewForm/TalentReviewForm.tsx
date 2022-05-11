import './TalentReviewForm.scss';
import { FormType } from 'generated/graphql';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/atoms/Loader/Loader';
import TRFormContainer from '../../components/molecules/TRFormContainer/TRFormContainer';
import useRespondantForm from '../../hooks/useRespondantForm';
import {
  TalentReviewFormField,
  TRespondantFormField,
} from '../../interfaces/TalentReviewForm';
import { ReactComponent as MicrophoneIcon } from './ic_microphone.svg';

interface ITalentReviewForm {
  ownerId: string;
  stageCandidateId: string;
  stageId: string;
  isReadOnly: boolean;
  onCloseHandler: () => void;
}

const TalentReviewForm: FC<ITalentReviewForm> = ({
  ownerId,
  stageCandidateId,
  isReadOnly,
  onCloseHandler,
}) => {
  console.log(stageCandidateId, 'stageCandidateID');
  const [fieldLayout, setFieldLayout] = useState<TalentReviewFormField>({
    levelFields: [],
    roleFields: [],
    successorFields: [],
    otherFields: [],
  });
  const history = useHistory();
  const [
    getCompanyCandidateRequestQueryResponse,
    formFields,
    handleSaveCandidateInformation,
  ] = useRespondantForm({
    onGetRespondantFormPreviouslyCompleted: () => {},
    onSaveRespondantFormCompleted: () => {
      console.log(stageCandidateId, 'stageCandidateId');
      history.push(`/stages/${stageCandidateId}`);
    },
    associatedId: parseInt(stageCandidateId),
    formOwnerId: parseInt(ownerId),
    formType: FormType.TrForm,
  });
  useEffect(() => {
    if (formFields && Array.isArray(formFields)) {
      let levels: TRespondantFormField[] = [];
      let roles: TRespondantFormField[] = [];
      let successors: TRespondantFormField[] = [];
      let others: TRespondantFormField[] = [];
      formFields?.forEach((formField, index) => {
        if (index >= 0 && index <= 2) levels.push(formField);
        else if (index > 2 && index <= 8) roles.push(formField);
        else if (index > 8 && index <= 14) successors.push(formField);
        else others.push(formField);
      });
      setFieldLayout({
        ...fieldLayout,
        levelFields: levels,
        roleFields: roles,
        successorFields: successors,
        otherFields: others,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields]);
  return (
    <div className="tr-form">
      {getCompanyCandidateRequestQueryResponse.loading && (
        <div className="tr-form__LoaderWrapper">
          <Loader />
        </div>
      )}
      {formFields && formFields.length > 0 && (
        <>
          <div className="tr-form__header">
            <MicrophoneIcon className="tr-form__header__icon" />
            <div className="tr-form__header__heading">Succession & Risk</div>
          </div>
          <TRFormContainer
            fieldLayout={fieldLayout}
            fields={formFields || []}
            onSubmit={handleSaveCandidateInformation}
            isReadOnly={isReadOnly}
            stageCandidateId={stageCandidateId}
            onCloseHandler={onCloseHandler}
          />
        </>
      )}
    </div>
  );
};

export default TalentReviewForm;
