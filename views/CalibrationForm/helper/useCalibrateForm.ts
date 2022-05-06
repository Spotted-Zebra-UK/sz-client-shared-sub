import { useCallback, useEffect, useMemo, useState } from 'react';
import { LazyQueryResult, QueryResult } from '@apollo/client';
import {
  BasicScoreType,
  CalibrationConfigFindOneQuery,
  Exact,
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
}

export const useCalibrateForm = ({
  stageCandidateId,
  onCloseHandler,
  doneBy,
  doneFor,
  projectId,
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
      name: 'overall',
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

  const onCreateVersion = () => {
    const payload: ResultCreateOneTrCustomArgs[] = [];
    let label = getResultAccessResponse.data?.ResultAccessFindOne?.label || '';
    if (!label) return;

    formSoftSkills[selectedScreen].updatedResult.forEach(data => {
      let score = data?.score as TrCustomResultScoreModel;
      payload.push({
        doneBy,
        doneFor,
        projectId,
        label: label || '',
        score: {
          evaluation: score.evaluation,
          score: score.score,
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
          score: score.score,
        },
        measurementId: data.measurementId,
        measurementType: data.measurementType,
      });
    });
    createResultVersion({
      variables: {
        args: payload,
      },
      onCompleted: () => {
        onCloseHandler();
      },
      onError: error => {
        console.log(error);
        onCloseHandler();
      },
    });
  };
  const onUpdateStatus = () => {
    updateStatus({
      variables: {
        stageCandidateId: stageCandidateId,
        status: StageCandidateStatus.SignedOff,
      },
      onCompleted: () => {
        onCloseHandler();
      },
      onError: error => {
        console.log(error);
        onCloseHandler();
      },
    });
  };

  const [getSoftSkills, getSoftSkillsQueryResponse] =
    useSoftSkillFindManyLazyQuery();

  const [getResultsSoftSkills, getResultsSoftSkillsResponse] =
    useResultFindManyLazyQuery();
  const [getResultsSuccessProfile, getResultsSuccessProfileResponse] =
    useResultFindManyLazyQuery();

  const [getResultAccess, getResultAccessResponse] =
    useResultAccessFindOneLazyQuery({
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
        let step = 100 / (totalScore - 1);
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
        let step = 100 / (totalScore - 1);
        let result = (currentGradeBand.position - 1) * step;
        return result;
      }
      return 0;
    },
    [getCalibrateFormQueryResponse.data, totalScore]
  );

  // Formatting Form Result
  const getFormResult = useCallback(
    (data: ResultModel[], formType: BasicScoreType) => {
      let formResultDictionary: { [key: string]: ResultModel[] } = {};
      const formattedFormResults: IFormResult[] = [];
      // if (!getResultAccessResponse.data?.ResultAccessFindOne?.status) return;
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
    [getResultAccessResponse?.data?.ResultAccessFindOne, getScore]
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
