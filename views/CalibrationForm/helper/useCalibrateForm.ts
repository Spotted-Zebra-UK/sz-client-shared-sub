import { useCallback, useEffect, useMemo, useState } from 'react';
import { LazyQueryResult, MutationResult, QueryResult } from '@apollo/client';
import {
  AssignedType,
  BasicScoreType,
  CalibrationConfigFindOneQuery,
  Exact,
  GradeBandModel,
  InputMaybe,
  ResultAccessFindOneMutation,
  ResultAccessStatus,
  ResultCreateVersionArgs,
  ResultFindManyQuery,
  ResultModel,
  SoftSkillFindManyQuery,
  StageCandidateStatus,
  useCalibrationConfigFindOneQuery,
  useResultAccessFindOneMutation,
  useResultCreateVersionsMutation,
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
}
interface IUseCalibrateForm {
  stageCandidateId: number;
  ownerId: number;
  onCloseHandler: () => void;
}

export const useCalibrateForm = ({
  stageCandidateId,
  ownerId,
  onCloseHandler,
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
      stageCandidateId: number;
      type?: InputMaybe<BasicScoreType> | undefined;
    }>
  >,

  MutationResult<ResultAccessFindOneMutation>,
  (value: number, index: number) => void,
  (value: number, index: number) => void,
  string[],
  number,
  number,
  IFormScreen[],
  QueryResult<
    CalibrationConfigFindOneQuery,
    Exact<{
      ownerId: number;
      type: AssignedType;
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

  const [createResultVersion] = useResultCreateVersionsMutation();
  const [updateStatus] = useStageCandidateUpdateMutation();

  const onCreateVersion = () => {
    const payload: ResultCreateVersionArgs[] = [];
    let label = getResultAccessResponse.data?.ResultAccessFindOne.label;
    if (!label) return;

    formSoftSkills[selectedScreen].updatedResult.forEach(data => {
      payload.push({
        previousId: data.id,
        label: label || '',
        creatorService: 'TR Calibiration',
        score: {
          customEvaluation: data.score.customEvaluation,
        },
      });
    });
    formSuccessProfiles[selectedScreen].updatedResult.forEach(data => {
      payload.push({
        previousId: data.id,
        label: label || '',
        creatorService: 'TR Calibiration',
        score: {
          customEvaluation: data.score.customEvaluation,
        },
      });
    });
    createResultVersion({
      variables: {
        versions: payload,
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

  const [
    getSoftSkills,
    getSoftSkillsQueryResponse,
  ] = useSoftSkillFindManyLazyQuery();

  const [
    getResultsSoftSkills,
    getResultsSoftSkillsResponse,
  ] = useResultFindManyLazyQuery();
  const [
    getResultsSuccessProfile,
    getResultsSuccessProfileResponse,
  ] = useResultFindManyLazyQuery();

  const [
    getResultAccess,
    getResultAccessResponse,
  ] = useResultAccessFindOneMutation();

  // Formatting GradeBands
  const formatGradeBands = (gradeBands: GradeBandModel[]) => {
    let newGrades: IGrade[] = [];
    let gradePointsDictionary: { [key: string]: number } = {};

    gradeBands.forEach(gradeBand => {
      let tp: number = gradePointsDictionary[gradeBand.groupName];
      if (isNaN(tp)) {
        gradePointsDictionary[gradeBand.groupName] = 1;
      } else gradePointsDictionary[gradeBand.groupName] += 1;
    });
    newGrades = Object.keys(gradePointsDictionary).map(key => {
      return { name: key, totalPoints: gradePointsDictionary[key] };
    });
    setGrades(newGrades);
  };

  const getCalibrateFormQueryResponse = useCalibrationConfigFindOneQuery({
    variables: {
      ownerId: ownerId,
      type: AssignedType.Stage,
    },
    onError: () => {},
    onCompleted: data => {
      getSoftSkills({
        variables: { ids: data.CalibrationConfigFindOne?.softSkillIds || [] },
      });
      getResultsSoftSkills({
        variables: {
          stageCandidateId: stageCandidateId,
          type: BasicScoreType.SoftSkill,
        },
      });
      getResultsSuccessProfile({
        variables: {
          stageCandidateId: stageCandidateId,
          type: BasicScoreType.SuccessProfile,
        },
      });
      getResultAccess({
        variables: {
          stageCandidateId: stageCandidateId,
        },
      });

      // Formatting gradebands
      formatGradeBands(data.CalibrationConfigFindOne?.gradeBands || []);
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
        let {
          gradeBands,
        } = getCalibrateFormQueryResponse.data.CalibrationConfigFindOne;
        let index = score / step;
        let result = gradeBands![index]?.name || '';
        return result;
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
        let {
          gradeBands,
        } = getCalibrateFormQueryResponse.data.CalibrationConfigFindOne;
        let currentGradeBand = gradeBands?.find(grade => grade.name === value);
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

      //setting Score
      let results = data.map(obj => {
        return {
          ...obj,
          score: {
            ...obj.score,
            customScore: getScore(obj.score.customEvaluation),
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
          return screen;
        }
      );
      if (
        getResultAccessResponse.data?.ResultAccessFindOne.status ===
        ResultAccessStatus.SignedOff
      ) {
        screens.pop();
      }
      if (formType === BasicScoreType.SoftSkill) setFormSoftSkills(screens);
      else if (formType === BasicScoreType.SuccessProfile)
        setFormSuccessProfile(screens);
    },
    [getResultAccessResponse.data?.ResultAccessFindOne.status, getScore]
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
        getResultsSoftSkillsResponse.data?.ResultFindMany,
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
        getResultsSuccessProfileResponse.data?.ResultFindMany,
        BasicScoreType.SuccessProfile
      );
  }, [getFormResult, getResultsSuccessProfileResponse.data]);

  const onChangeSoftSkill = (value: number, index: number) => {
    let updateFormSoftSkills = JSON.parse(JSON.stringify(formSoftSkills));
    updateFormSoftSkills[selectedScreen].updatedResult[
      index
    ].score.customScore = value;
    updateFormSoftSkills[selectedScreen].updatedResult[
      index
    ].score.customEvaluation = getCustomEvaluation(value);
    setFormSoftSkills(updateFormSoftSkills);
  };
  const onChangeSuccessProfile = (value: number, index: number) => {
    let updateFormSuccessProfile = JSON.parse(
      JSON.stringify(formSuccessProfiles)
    );
    updateFormSuccessProfile[selectedScreen].updatedResult[
      index
    ].score.customScore = value;
    updateFormSuccessProfile[selectedScreen].updatedResult[
      index
    ].score.customEvaluation = getCustomEvaluation(value);
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
