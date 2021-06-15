/* eslint-disable @typescript-eslint/no-explicit-any */
import { GradeType } from '../../../enums/gradeType';
import {
  ICandidateReportCandidateDataResponse,
  ICandidateReportData,
  TCandidateReportSoftSkill,
} from '../../../interfaces/candidateReport';

export const getGradeStringWithScoreAsDefault = (
  score: number,
  grade: string,
  gradeType?: GradeType | undefined
): string => {
  if (gradeType === GradeType.GRADE) {
    return grade;
  }

  if (gradeType === GradeType.NONE) {
    return '';
  }

  if (gradeType === GradeType.PERCENTILE) {
    return `${Math.round(score)}`;
  }

  return `${Math.round(score / 10)}`;
};

export const parseCandidateReport = (
  getCandidateReportQueryResponse: ICandidateReportCandidateDataResponse
) => {
  const parsedCandidateData = JSON.parse(
    getCandidateReportQueryResponse.candidateReport.candidateData
  );

  return {
    ...getCandidateReportQueryResponse.candidateReport,
    ...parsedCandidateData,
    totalGrade: getGradeStringWithScoreAsDefault(
      parsedCandidateData.totalScore,
      parsedCandidateData.totalGrade
    ),
    softSkills: parsedCandidateData.softSkills.map(
      (softSkill: TCandidateReportSoftSkill) => ({
        ...softSkill,
        grade: getGradeStringWithScoreAsDefault(
          softSkill.score,
          softSkill.grade
        ),
      })
    ),
    typeScores: parsedCandidateData.typeScores.map((typeScore: any) => ({
      ...typeScore,
      grade: getGradeStringWithScoreAsDefault(typeScore.score, typeScore.grade),
    })),
  } as ICandidateReportData;
};
