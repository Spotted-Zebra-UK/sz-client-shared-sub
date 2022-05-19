import { useCallback, useEffect, useMemo, useState } from 'react';
import { LazyQueryResult, QueryResult } from '@apollo/client';
import {
  BasicScoreType,
  CalibrationConfigFindOneQuery,
  Exact,
  GetTestCardsDocument,
  GradeBandUnion,
  InputMaybe,
  ResultAccessFindOneQuery,
  ResultAccessStatus,
  ResultCreateOneTrCustomArgs,
  ResultFindManyQuery,
  ResultMeasurementType,
  ResultModel,
  SoftSkillFindManyQuery,
  StageCandidateStatus,
  TrCustomEvaluation,
  TrCustomGradeBandModel,
  TrCustomResultScoreModel,
  useCalibrationConfigFindOneQuery,
  useResultAccessFindOneLazyQuery,
  useResultCreateManyTrCustomMutation,
  useResultFindManyLazyQuery,
  useSoftSkillFindManyLazyQuery,
  useStageCandidateUpdateMutation,
} from '../../../../../generated/graphql';
import PerformanceIcon from '../../../icons/calibrate/ic_performance.svg';
import PersonIconUrl from '../../../icons/calibrate/ic_person.svg';
import PotentialIcon from '../../../icons/calibrate/ic_potential.svg';
import ValuesIcon from '../../../icons/calibrate/ic_values.svg';

interface IGrade {
  name: string;
  totalPoints: number;
}

interface IFormResult {
  name: string;
  result: ResultModel[];
}
interface IFormScreen {
  name: string | null;
  originalResult: ResultModel[];
  updatedResult: ResultModel[];
  isScreenCompleted: boolean;
  // currentScore: TrCustomResultScoreModel;
}
interface IUseCalibrateForm {
  stageCandidateId: number;
  onCloseHandler: () => void;
  doneFor: number;
  doneBy: number;
  projectId: number;
  userType: 'candidate' | 'company';
}

export const useCalibrateForm = ({
  stageCandidateId,
  onCloseHandler,
  doneBy,
  doneFor,
  projectId,
  userType,
}: IUseCalibrateForm): [
  IGrade[],
  {
    name: string;
    id: number;
  }[],
  () => void,
  () => void,
  LazyQueryResult<
    SoftSkillFindManyQuery,
    Exact<{
      ids?: InputMaybe<number | number[]> | undefined;
    }>
  >,
  LazyQueryResult<
    ResultFindManyQuery,
    Exact<{
      doneBy: number;
      doneFor: number;
      projectId: number;
      measurementIds?: InputMaybe<number | number[]> | undefined;
      measurementType?: InputMaybe<ResultMeasurementType> | undefined;
    }>
  >,

  LazyQueryResult<
    ResultAccessFindOneQuery,
    Exact<{
      stageCandidateId: number;
    }>
  >,
  (value: number, index: number) => void,
  (value: number, index: number) => void,
  string[],
  number,
  number,
  IFormScreen[],
  QueryResult<
    CalibrationConfigFindOneQuery,
    Exact<{
      projectId: number;
    }>
  >,
  IFormScreen[],
  React.Dispatch<React.SetStateAction<number>>,
  string[],
  number
] => {
  const [grades, setGrades] = useState<IGrade[]>([]);

  let totalScore: number = useMemo(() => {
    let ts: number = grades.reduce((acc, group) => {
      return acc + group.totalPoints;
    }, 0);
    return ts;
  }, [grades]);

  // TODO: Need to make it dynamic.
  const successProfiles = [
    {
      name: 'Overall',
      id: 2000,
    },
  ];
  const [selectedScreen, setSelectedScreen] = useState(0);
  const [formSoftSkills, setFormSoftSkills] = useState<IFormScreen[]>([]);
  const [formSuccessProfiles, setFormSuccessProfile] = useState<IFormScreen[]>(
    []
  );

  const [createResultVersion] = useResultCreateManyTrCustomMutation();
  const [updateStatus] = useStageCandidateUpdateMutation();
  const getScoreFromEvaluation = (evaluation: TrCustomEvaluation): number => {
    // 1 <= 2.5 <= 4 <= 5.5 <= 7
    if (evaluation === TrCustomEvaluation.StarTalent) {
      return 6.25;
    } else if (evaluation === TrCustomEvaluation.RisingTalent) {
      return 4.75;
    } else if (evaluation === TrCustomEvaluation.SolidContributor) {
      return 3.25;
    } else if (evaluation === TrCustomEvaluation.UnderperformingTalent) {
      return 1.75;
    }
    return 1.75;
  };

  const getResultCreateOneTrCustomArgs = (
    label: string
  ): ResultCreateOneTrCustomArgs[] => {
    const payload: ResultCreateOneTrCustomArgs[] = [];
    formSoftSkills[selectedScreen].updatedResult.forEach(data => {
      let score = data?.score as TrCustomResultScoreModel;
      payload.push({
        doneBy,
        doneFor,
        projectId,
        label: label || '',
        score: {
          evaluation: score.evaluation,
          score: getScoreFromEvaluation(score.evaluation),
        },
        measurementId: data.measurementId,
        measurementType: data.measurementType,
      });
    });
    formSuccessProfiles[selectedScreen].updatedResult.forEach(data => {
      let score = data?.score as TrCustomResultScoreModel;
      payload.push({
        doneBy,
        doneFor,
        projectId,
        label: label || '',
        score: {
          evaluation: score.evaluation,
          score: getScoreFromEvaluation(score.evaluation),
        },
        measurementId: data.measurementId,
        measurementType: data.measurementType,
      });
    });
    return payload;
  };

  const onCreateVersion = () => {
    let label = getResultAccessResponse.data?.ResultAccessFindOne?.label || '';
    if (!label) return;

    const payload: ResultCreateOneTrCustomArgs[] =
      getResultCreateOneTrCustomArgs(label);

    createResultVersion({
      variables: {
        args: payload,
      },
      onCompleted: data => {
        if (data.ResultCreateManyTrCustom) {
          if (userType === 'company') window.location.reload();
          onCloseHandler();
        }
      },
      onError: error => {
        console.log(error);
        // onCloseHandler();
      },
      refetchQueries:
        userType === 'candidate'
          ? [
              {
                query: GetTestCardsDocument,
                variables: {
                  stageCandidateId,
                },
              },
            ]
          : [],
    });
  };
  const onUpdateStatus = () => {
    const payload: ResultCreateOneTrCustomArgs[] =
      getResultCreateOneTrCustomArgs('signed off');

    createResultVersion({
      variables: {
        args: payload,
      },
      onCompleted: () => {
        updateStatus({
          variables: {
            stageCandidateId: stageCandidateId,
            status: StageCandidateStatus.SignedOff,
          },
          onCompleted: () => {
            if (userType === 'company') window.location.reload();
            onCloseHandler();
          },
          onError: error => {
            console.log(error);
            onCloseHandler();
          },
        });
      },
      onError: error => {
        console.log(error);
        onCloseHandler();
      },
      refetchQueries:
        userType === 'candidate'
          ? [
              {
                query: GetTestCardsDocument,
                variables: {
                  stageCandidateId,
                },
              },
            ]
          : [],
    });
  };

  const [getSoftSkills, getSoftSkillsQueryResponse] =
    useSoftSkillFindManyLazyQuery({
      fetchPolicy: 'network-only',
    });

  const [getResultsSoftSkills, getResultsSoftSkillsResponse] =
    useResultFindManyLazyQuery({
      fetchPolicy: 'network-only',
    });
  const [getResultsSuccessProfile, getResultsSuccessProfileResponse] =
    useResultFindManyLazyQuery({
      fetchPolicy: 'network-only',
    });

  const [getResultAccess, getResultAccessResponse] =
    useResultAccessFindOneLazyQuery({
      fetchPolicy: 'network-only',
      variables: {
        stageCandidateId: stageCandidateId,
      },
    });

  // Formatting GradeBands
  const formatGradeBands = (gradeBands: GradeBandUnion[]) => {
    let newGrades: IGrade[] = [];
    let gradePointsDictionary: { [key: string]: number } = {};

    gradeBands.forEach(gradeBand => {
      let castedGradeBand = gradeBand as TrCustomGradeBandModel;
      let tp: number = gradePointsDictionary[castedGradeBand.displayText];
      if (isNaN(tp)) {
        gradePointsDictionary[castedGradeBand.displayText] = 1;
      } else gradePointsDictionary[castedGradeBand.displayText] += 1;
    });
    newGrades = Object.keys(gradePointsDictionary).map(key => {
      return { name: key, totalPoints: gradePointsDictionary[key] };
    });
    setGrades(newGrades);
  };

  const getCalibrateFormQueryResponse = useCalibrationConfigFindOneQuery({
    fetchPolicy: 'network-only',
    variables: {
      projectId,
    },
    onError: () => {},
    onCompleted: data => {
      getSoftSkills({
        variables: { ids: data.CalibrationConfigFindOne?.softSkillIds || [] },
      });
      getResultsSoftSkills({
        variables: {
          doneBy,
          doneFor,
          projectId,
          measurementType: ResultMeasurementType.SoftSkill,
          measurementIds: data?.CalibrationConfigFindOne?.softSkillIds,
          onlyLatestVersionPerLabel: true,
        },
      });
      getResultsSuccessProfile({
        variables: {
          doneBy,
          doneFor,
          projectId,
          measurementType: ResultMeasurementType.SuccessProfile,
          measurementIds: [
            data?.CalibrationConfigFindOne?.successProfileId || 0,
          ],
          onlyLatestVersionPerLabel: true,
        },
      });
      getResultAccess({
        variables: {
          stageCandidateId: stageCandidateId,
        },
      });

      // Formatting gradebands
      formatGradeBands(
        (data.CalibrationConfigFindOne
          ?.gradeBands as TrCustomGradeBandModel[]) || []
      );
    },
  });

  // Calculating Custom Evaluation

  const getCustomEvaluation = useCallback(
    (score: number) => {
      if (
        getCalibrateFormQueryResponse.data &&
        getCalibrateFormQueryResponse.data.CalibrationConfigFindOne
      ) {
        let step = 75 / (totalScore - 1);
        let { gradeBands } =
          getCalibrateFormQueryResponse.data.CalibrationConfigFindOne;
        let index = score / step;

        let result = (gradeBands![index] as TrCustomGradeBandModel) || '';
        return result.evaluation;
      }
      return '';
    },
    [getCalibrateFormQueryResponse.data, totalScore]
  );

  // Calculating total Score
  const getScore = useCallback(
    (value: string | null | undefined): number => {
      if (!value) return 0;
      if (
        getCalibrateFormQueryResponse.data &&
        getCalibrateFormQueryResponse.data.CalibrationConfigFindOne
      ) {
        let gradeBands = getCalibrateFormQueryResponse.data
          .CalibrationConfigFindOne.gradeBands as TrCustomGradeBandModel[];
        let currentGradeBand = gradeBands?.find(
          grade => grade.evaluation === value
        );
        if (!currentGradeBand) return 0;
        let step = 75 / (totalScore - 1);
        let result = (currentGradeBand.position - 1) * step;
        return result;
      }
      return 0;
    },
    [getCalibrateFormQueryResponse.data, totalScore]
  );

  // Formatting Form Result
  const getFormResult = useCallback(
    (resultFields: ResultModel[], formType: BasicScoreType) => {
      let data = resultFields.sort((a, b) => a.measurementId - b.measurementId);
      let formResultDictionary: { [key: string]: ResultModel[] } = {};
      const formattedFormResults: IFormResult[] = [];
      //setting Score
      let results = data.map(obj => {
        let { score } = obj;
        let castedScore = score as unknown as TrCustomGradeBandModel;
        return {
          ...obj,
          score: {
            ...obj.score,
            score: getScore(castedScore.evaluation),
          },
        };
      });
      results.forEach((result, index) => {
        let key = result.label || index.toString();
        if (
          !formResultDictionary[key] ||
          !Array.isArray(formResultDictionary[key])
        ) {
          formResultDictionary[key] = [];
        }

        formResultDictionary[key].push(result);
      });
      Object.keys(formResultDictionary).forEach(fr => {
        formattedFormResults.push({
          name: fr,
          result: formResultDictionary[fr],
        });
      });

      let screens: IFormScreen[] = formattedFormResults.map(
        (formattedFormResult, index) => {
          let screen: IFormScreen = {
            name:
              index + 1 < formattedFormResults.length
                ? formattedFormResults[index + 1].name
                : null,
            originalResult: formattedFormResult.result,
            updatedResult:
              index + 1 < formattedFormResults.length
                ? formattedFormResults[index + 1].result
                : formattedFormResults[index].result,
            isScreenCompleted:
              index + 1 < formattedFormResults.length ? true : false,
          };

          if (
            getResultAccessResponse.data?.ResultAccessFindOne?.status ===
            ResultAccessStatus.LockedForHigherLevel
          ) {
            screen.isScreenCompleted = true;
          }
          return screen;
        }
      );
      if (
        screens.length > 1 &&
        getResultAccessResponse.data?.ResultAccessFindOne?.status ===
          ResultAccessStatus.Editable &&
        screens[screens.length - 2].name === 'talent team decision'
      ) {
        screens.pop();
        screens[screens.length - 1].name = null;
        screens[screens.length - 1].isScreenCompleted = false;
      }
      if (
        getResultAccessResponse.data?.ResultAccessFindOne?.status ===
          ResultAccessStatus.LockedForHigherLevel &&
        userType === 'company'
      ) {
        screens.pop();
      }
      if (
        getResultAccessResponse?.data?.ResultAccessFindOne &&
        getResultAccessResponse?.data?.ResultAccessFindOne.status ===
          ResultAccessStatus.SignedOff
      ) {
        screens.pop();
      }
      if (formType === BasicScoreType.SoftSkill) {
        setFormSoftSkills(screens);
      } else if (formType === BasicScoreType.SuccessProfile) {
        setFormSuccessProfile(screens);
      }
    },
    [getResultAccessResponse.data?.ResultAccessFindOne, getScore, userType]
  );

  useEffect(() => {
    setSelectedScreen(formSoftSkills.length - 1);
  }, [formSoftSkills.length]);

  // Formatting SoftSkills Fields
  useEffect(() => {
    if (
      getResultsSoftSkillsResponse.data &&
      getResultsSoftSkillsResponse.data.ResultFindMany
    )
      getFormResult(
        getResultsSoftSkillsResponse.data?.ResultFindMany as ResultModel[],
        BasicScoreType.SoftSkill
      );
  }, [getFormResult, getResultsSoftSkillsResponse.data]);

  // Formatting SuccessProfile Fields
  useEffect(() => {
    if (
      getResultsSuccessProfileResponse.data &&
      getResultsSuccessProfileResponse.data.ResultFindMany
    )
      getFormResult(
        getResultsSuccessProfileResponse.data.ResultFindMany as ResultModel[],
        BasicScoreType.SuccessProfile
      );
  }, [getFormResult, getResultsSuccessProfileResponse.data]);

  const onChangeSoftSkill = (value: number, index: number) => {
    let updateFormSoftSkills = JSON.parse(JSON.stringify(formSoftSkills));
    updateFormSoftSkills[selectedScreen].updatedResult[index].score.score =
      value;
    updateFormSoftSkills[selectedScreen].updatedResult[index].score.evaluation =
      getCustomEvaluation(value);
    setFormSoftSkills(updateFormSoftSkills);
  };
  const onChangeSuccessProfile = (value: number, index: number) => {
    let updateFormSuccessProfile = JSON.parse(
      JSON.stringify(formSuccessProfiles)
    );
    updateFormSuccessProfile[selectedScreen].updatedResult[index].score.score =
      value;
    updateFormSuccessProfile[selectedScreen].updatedResult[
      index
    ].score.evaluation = getCustomEvaluation(value);
    setFormSuccessProfile(updateFormSuccessProfile);
  };
  const icons: string[] = [
    ValuesIcon,
    PerformanceIcon,
    PotentialIcon,
    PersonIconUrl,
  ];

  let colors: string[] = ['#00d3ad', '#10b7ff', '#b75bff', '#000'];

  let totalColors: number = colors.length;
  return [
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
  ];
};
