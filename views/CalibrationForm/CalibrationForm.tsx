import './CalibrationForm.scss';
import React, { FC } from 'react';
import { TrCustomResultScoreModel } from '../../../../generated/graphql';
import Loader from '../../components/atoms/Loader/Loader';
import PersonIconUrl, { ReactComponent as PersonIcon } from '../../icons/calibrate/ic_person.svg';
import CalibrateField from './CalibrateField/CalibrateField';
import CalibrationAction from './CalibrationAction/CalibrationAction';
import { useCalibrateForm } from './helper/useCalibrateForm';
import { ReactComponent as LeftArrow } from './left_arrow.svg';
import { ReactComponent as RightArrow } from './right_arrow.svg';

interface ICalibrationForm {
  stageCandidateId: number;
  ownerId: number;
  userType: 'candidate' | 'company';
  onCloseHandler: () => void;
}

const CalibrationForm: FC<ICalibrationForm> = ({
  ownerId,
  stageCandidateId,
  userType,
  onCloseHandler,
}) => {
  const [
    grades,
    successProfiles,
    onCreateVersion,
    onUpdateStatus,
    getSoftSkillsQueryResponse,
    getResultsSoftSkillsResponse,
    getResultAccessResponse,
    onChangeSoftSkill,
    onChangeSuccessProfile,
    icons,
    totalColors,
    selectedScreen,
    formSuccessProfiles,
    getCalibrateFormQueryResponse,
    formSoftSkills,
    setSelectedScreen,
    colors,
    totalScore,
  ] = useCalibrateForm({
    ownerId: ownerId,
    stageCandidateId: stageCandidateId,
    onCloseHandler,
  });

  return (
    <div className="calibration">
      {getCalibrateFormQueryResponse.loading ||
        (getResultsSoftSkillsResponse.loading && (
          <div className="calibration__LoaderWrapper">
            <Loader />
          </div>
        ))}
      {getCalibrateFormQueryResponse.data &&
        formSoftSkills[selectedScreen] &&
        getResultAccessResponse.data && (
          <>
            {userType === 'candidate' ? (
              <div className="calibration__header">
                <PersonIcon className="calibration__header__icon" />
                <div className="calibration__header__heading">
                  Make Final Decision
                </div>
              </div>
            ) : (
              <div className="calibration__navigation">
                <button
                  className="calibration__navigation__icon-button"
                  // disabled={true}
                  onClick={() => {
                    setSelectedScreen(prev => prev - 1);
                  }}
                  disabled={selectedScreen === 0}
                >
                  <LeftArrow />
                </button>
                <div
                  className={`${
                    formSoftSkills[selectedScreen].isScreenCompleted
                      ? 'completed'
                      : ''
                  }`}
                >
                  {selectedScreen + 1}/{formSoftSkills.length}{' '}
                  {formSoftSkills[selectedScreen].name
                    ? formSoftSkills[selectedScreen].name
                    : ` Make ${
                        getResultAccessResponse.data?.ResultAccessFindOne
                          ?.label || ''
                      }`}
                </div>
                <button
                  className="calibration__navigation__icon-button"
                  onClick={() => {
                    setSelectedScreen(prev => prev + 1);
                  }}
                  disabled={selectedScreen === formSoftSkills.length - 1}
                >
                  <RightArrow />
                </button>
              </div>
            )}

            <div className="calibration__form">
              <div className="calibration__form__header">
                <div className="calibration__form__header__heading-top">
                  {''}
                </div>
                <div className="calibration__form__header__form-top">
                  {grades.map((group, index) => (
                    <React.Fragment key={index}>
                      <div className={`flex-${group.totalPoints}`} key={index}>
                        <div
                          className="label"
                          style={{
                            borderBottom: `3px solid ${
                              colors[totalColors - 1 - (index % totalColors)]
                            }`,
                          }}
                        >
                          {group.name}
                        </div>
                        <div
                          style={{
                            backgroundColor:
                              colors[totalColors - 1 - (index % totalColors)],
                            height:
                              (getSoftSkillsQueryResponse.data &&
                              Array.isArray(
                                getSoftSkillsQueryResponse.data
                                  ?.SoftSkillFindMany
                              )
                                ? getSoftSkillsQueryResponse.data
                                    ?.SoftSkillFindMany?.length
                                : 0) * 120,
                            opacity: '0.08',
                            marginTop: 20,
                          }}
                        >
                          {' '}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {getSoftSkillsQueryResponse.data &&
                formSoftSkills[selectedScreen] &&
                formSuccessProfiles[selectedScreen] && (
                  <>
                    {getSoftSkillsQueryResponse.data.SoftSkillFindMany?.map(
                      (
                        obj: {
                          name: string;
                          id: number;
                        },
                        key: number
                      ) => {
                        let originalScore = formSuccessProfiles[selectedScreen]
                          ?.originalResult[selectedScreen]
                          ?.score as TrCustomResultScoreModel;
                        let updatedScore = formSuccessProfiles[selectedScreen]
                          ?.originalResult[selectedScreen]
                          ?.score as TrCustomResultScoreModel;
                        return (
                          <CalibrateField
                            key={key}
                            index={key as number}
                            onChangeHandler={onChangeSoftSkill}
                            softsSkill={obj}
                            totalScore={totalScore - 1}
                            initialData={originalScore.score || 0}
                            currentData={
                              formSoftSkills[selectedScreen] &&
                              Array.isArray(
                                formSoftSkills[selectedScreen].updatedResult
                              )
                                ? updatedScore.score || 0
                                : 0
                            }
                            icon={icons[key]}
                            showInitialField={true}
                            isScreenCompleted={
                              formSoftSkills[selectedScreen].isScreenCompleted
                            }
                          />
                        );
                      }
                    )}
                    {formSuccessProfiles[selectedScreen] &&
                      successProfiles.map((obj, index) => {
                        let originalScore = formSuccessProfiles[selectedScreen]
                          ?.originalResult[index]
                          ?.score as TrCustomResultScoreModel;
                        let updatedScore = formSuccessProfiles[selectedScreen]
                          ?.originalResult[index]
                          ?.score as TrCustomResultScoreModel;
                        return (
                          <CalibrateField
                            key={obj.id}
                            index={index}
                            onChangeHandler={onChangeSuccessProfile}
                            softsSkill={{ name: 'overall', id: obj.id }}
                            totalScore={totalScore - 1}
                            initialData={originalScore.score || 0}
                            currentData={updatedScore.score || 0}
                            icon={PersonIconUrl}
                            showInitialField={true}
                            isScreenCompleted={
                              formSoftSkills[selectedScreen].isScreenCompleted
                            }
                            showHandlerLabel={true}
                            handlerLabel={updatedScore.evaluation || ''}
                          />
                        );
                      })}
                  </>
                )}
            </div>
            <div className="calibration__action">
              <CalibrationAction
                currentUser={
                  getResultAccessResponse.data?.ResultAccessFindOne?.label || ''
                }
                onCreateVersion={onCreateVersion}
                onUpdateStatus={onUpdateStatus}
                onCloseHandler={onCloseHandler}
                actions={
                  getResultAccessResponse.data?.ResultAccessFindOne
                    ?.allowedActions
                }
                isScreenCompleted={
                  formSoftSkills[selectedScreen].isScreenCompleted
                }
              />
            </div>
          </>
        )}
    </div>
  );
};

export default CalibrationForm;
