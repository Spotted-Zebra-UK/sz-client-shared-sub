import {
  ContentRoleLevel,
  SoftSkillDataSourceType,
  SoftSkillType,
} from '../enums/successProfile.enum';
import { Tests } from '../enums/test.enum';

export type TSuccessProfileReportSoftSkillDataSource = {
  id: number;
  type: SoftSkillDataSourceType;
  color: 'PURPLE' | 'BLUE' | 'GREEN';
};

export type TSuccessProfileReportSoftSkill = {
  id: number;
  softSkillId: number;
  type: SoftSkillType;
  name: string;
  subText: string;
  mainText: string;
  dataSources: TSuccessProfileReportSoftSkillDataSource[];
};

export type TSuccessProfileReportAssessmentSummaryTestSummary = {
  id: number;
  type: Tests;
  summary: string;
  time: number;
};

export type TSuccessProfileReportAssessmentSummary = {
  totalTime: number;
  indirectInvitationUrl: string;
  testsSummary: TSuccessProfileReportAssessmentSummaryTestSummary[];
};

export type TSuccessProfileReportSoftSkillTypeSummary = {
  type: SoftSkillType;
  summary: string;
  title: string;
};

export type TSuccessProfileReportNotIncludedSoftSkill = {
  id: number;
  name: string;
};

export type TSuccessProfileReportNotIncludedSoftSkills = {
  ourSuccess: TSuccessProfileReportNotIncludedSoftSkill[];
  yourSuccess: TSuccessProfileReportNotIncludedSoftSkill[];
  ourFutureSuccess: TSuccessProfileReportNotIncludedSoftSkill[];
};

export type TSuccessProfileReport = {
  successProfileId: number;
  projectName: string;
  createdAt: string;
  roleLevel: ContentRoleLevel;
  companyLogoUrl?: string;
  softSkills: TSuccessProfileReportSoftSkill[];
  assessmentSummary: TSuccessProfileReportAssessmentSummary;
  softSkillTypesSummary: TSuccessProfileReportSoftSkillTypeSummary[];
  notIncludedSoftSkills: TSuccessProfileReportNotIncludedSoftSkills;
};
