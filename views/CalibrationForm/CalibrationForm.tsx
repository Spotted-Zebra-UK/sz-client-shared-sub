import './CalibrationForm.scss';
import { t } from 'i18next';
import React, { FC } from 'react';
import ReactTooltip from 'react-tooltip';
import { TrCustomResultScoreModel } from '../../../../generated/graphql';
import Loader from '../../components/atoms/Loader/Loader';
import Notification from '../../components/atoms/Notification/Notification';
import PersonIconUrl, { ReactComponent as PersonIcon } from '../../icons/calibrate/ic_person.svg';
import { ReactComponent as HintIcon } from '../../icons/ic_info.svg';
import CalibrateField from './CalibrateField/CalibrateField';
import CalibrationAction from './CalibrationAction/CalibrationAction';
import { useCalibrateForm } from './helper/useCalibrateForm';
import { ReactComponent as LeftArrow } from './left_arrow.svg';
import { ReactComponent as RightArrow } from './right_arrow.svg';

interface ICalibrationForm {
  stageCandidateId: number;
  userType: 'candidate' | 'company';
  onCloseHandler: () => void;
  doneFor: number;
  doneBy: number;
  projectId: number;
}

const CalibrationForm: FC<ICalibrationForm> = ({
  stageCandidateId,
  userType,
  onCloseHandler,
  doneBy,
  doneFor,
  projectId,
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
    stageCandidateId: stageCandidateId,
    onCloseHandler,
    doneBy,
    doneFor,
    projectId,
    userType,
  });
  const queryTips = [
    'This rating indicates that the individual is underperforming in their role.',
    'This rating indicates that the individual is performing adequately in their role.',
    'This rating indicates that the individual is performing well in their role, with the potential to be star talent.',
    'This rating indicates that the individual is exceeding expectations in their role, and is one of our top performers.',
  ];
  if (
    getResultAccessResponse.error ||
    getSoftSkillsQueryResponse.error ||
    getCalibrateFormQueryResponse.error ||
    getResultAccessResponse.data?.ResultAccessFindOne === null
  ) {
    return (
      <div className="calibration__NotificationWrapper">
        <Notification
          notification={{
            icon: 'Warning',
            color: 'Purple',
            message: t(
              'stages.unfortunatelyThereHasBeenProblemProcessingOneOrMoreOfYourTests'
            ),
          }}
        />
      </div>
    );
  }
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
        getResultAccessResponse.data &&
        formSuccessProfiles[selectedScreen] && (
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
              .
              <ReactTooltip
                type="light"
                className="tooltip-container"
                effect="solid"
                multiline={true}
                place={'bottom'}
              />
              <div className="calibration__form__header">
                <div className="calibration__form__header__heading-top">
                  {''}
                </div>
                <div className="calibration__form__header__form-top">
                  {grades.map((group, index) => (
                    <React.Fragment key={index}>
                      <div className={`flex-${group.totalPoints}`} key={index}>
                        <div
                          className="header-label"
                          style={{
                            borderBottom: `3px solid ${
                              colors[totalColors - 1 - (index % totalColors)]
                            }`,
                            marginTop: 20,
                          }}
                        >
                          {group.name}
                          <sup
                            style={{ cursor: 'pointer' }}
                            data-tip={queryTips[index]}
                          >
                            {' ?'}
                          </sup>
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
                                : 0) * 85,
                            opacity: '0.08',
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
                    {getSoftSkillsQueryResponse.data.SoftSkillFindMany?.sort(
                      (a, b) => a.id - b.id
                    )?.map(
                      (
                        obj: {
                          name: string;
                          id: number;
                        },
                        key: number
                      ) => {
                        let originalScore = formSoftSkills[selectedScreen]
                          ?.originalResult[key]
                          ?.score as TrCustomResultScoreModel;
                        let updatedScore = formSoftSkills[selectedScreen]
                          ?.updatedResult[key]
                          ?.score as TrCustomResultScoreModel;
                        return (
                          <CalibrateField
                            key={key}
                            index={key as number}
                            onChangeHandler={onChangeSoftSkill}
                            softsSkill={obj}
                            totalScore={totalScore}
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
                          ?.updatedResult[index]
                          ?.score as TrCustomResultScoreModel;
                        return (
                          <CalibrateField
                            key={obj.id}
                            index={index}
                            onChangeHandler={onChangeSuccessProfile}
                            softsSkill={{ name: 'Overall', id: obj.id }}
                            totalScore={totalScore}
                            initialData={originalScore.score || 0}
                            currentData={updatedScore.score || 0}
                            icon={PersonIconUrl}
                            showInitialField={true}
                            isScreenCompleted={
                              formSuccessProfiles[selectedScreen]
                                .isScreenCompleted
                            }
                            showHandlerLabel={true}
                            handlerLabel={updatedScore.evaluation || ''}
                          />
                        );
                      })}
                  </>
                )}
            </div>
            {getCalibrateFormQueryResponse.data &&
              formSoftSkills[selectedScreen] &&
              formSuccessProfiles[selectedScreen] && (
                <div className="calibration__action">
                  <CalibrationAction
                    currentUser={
                      getResultAccessResponse.data?.ResultAccessFindOne
                        ?.label || ''
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
              )}
          </>
        )}
    </div>
  );
};

export default CalibrationForm;
