export type TCandidateReportCandidate = {
  firstName: string;
  lastName: string;
  role: string;
};

export type TCompany = {
  createAt: string;
  deletedAt: string | null;
  id: number;
  logoUrl: string;
  name: string;
  updatedAt: string;
};

export type TCandidateReportSoftSkillRecommendedQuestion = {
  category: string;
  classification: string;
  feedback: string;
  id: number;
  mainQuestion: string;
  roleLevel: string;
  softSkill: string;
  subQuestion: string[];
  summary: string;
  trait: string;
};

export type TCandidateReportSoftSkillTrait = {
  bullet: string;
  category: string;
  classification: string;
  color: string;
  content: string;
  icon: string;
  id: number;
  name: string;
  orientation: string;
  privateId: number;
  rank: number;
  roleLevel: string;
  score: number;
  softSkill: string;
  softSkillId: number;
  summary: string;
  weight: number;
};

export type TCandidateReportSoftSkill = {
  candidateContent: string;
  category: string;
  color: string;
  description: string;
  grade: string;
  gradeDescription: string;
  hiringManagerContent: string;
  id: number;
  name: string;
  nonAdjustedScore: number;
  orientation: string;
  privateId: number;
  rank: number;
  recommendedQuestion: TCandidateReportSoftSkillRecommendedQuestion;
  roleLevel: string;
  score: number;
  scoreRange: string;
  text: string;
  traits: TCandidateReportSoftSkillTrait[];
  type: string;
  weight: number;
};

export type TCandidateReportSoftSkillShort = {
  candidateContent: string;
  category: string;
  description: string;
  grade: string;
  gradeDescription: string;
  hiringManagerContent: string;
  id: number;
  name: string;
  nonAdjustedScore: number;
  orientation: string;
  privateId: number;
  rank: number;
  roleLevel: string;
  score: number;
  scoreRange: string;
  traits: TCandidateReportSoftSkillTrait[];
  type: string;
  weight: number;
};

export type TTypeScore = {
  grade: string;
  name: string;
};

export interface ICandidateReportData {
  candidate: TCandidateReportCandidate;
  candidateData: string;
  company: TCompany;
  createdAt: string;
  id: number;
  softSkills: TCandidateReportSoftSkill[];
  subId: string;
  toImprove: TCandidateReportSoftSkillShort[];
  topSkills: TCandidateReportSoftSkillShort[];
  totalGrade: string;
  totalScore: number;
  typeScores: TTypeScore[];
}

export interface ICandidateReportCandidateDataInput {
  subId: string;
}

export interface ICandidateReportCandidateDataResponse {
  candidateReport: {
    candidateData: string;
    createdAt: string;
    id: number;
    subId: string;
  };
}
