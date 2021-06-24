import React, { FC } from 'react';

import SuccessProfileReportConvergence from './SuccessProfileReportConvergence/SuccessProfileReportConvergence';
import SuccessProfileSoftSkillTypesLegend from './SuccessProfileSoftSkillTypesLegend/SuccessProfileSoftSkillTypesLegend';
import './FirstPage.scss';
import RoleLevelChart from './RoleLevelChart/RoleLevelChart';
import AssessmentSummary from './AssessmentSummary/AssessmentSummary';
import AssessmentLinks from './AssessmentLinks/AssessmentLinks';
import SuccessProfileReportPageContainer from '../SuccessProfileReportPageContainer/SuccessProfileReportPageContainer';
import {
  ContentRoleLevel,
  SoftSkillType,
} from '../../../../enums/successProfile.enum';
import {
  TSuccessProfileReportSoftSkill,
  TSuccessProfileReportAssessmentSummary,
} from '../../../../helpers/successProfileReport.interface';

interface IFirstPage {
  companyLogoUrl?: string | undefined;
  successProfileReportSoftSkills: TSuccessProfileReportSoftSkill[];
  contentRoleLevel: ContentRoleLevel;
  assessmentSummary: TSuccessProfileReportAssessmentSummary;
  projectName: string;
  projectCreatedAt: string;
}

const FirstPage: FC<IFirstPage> = ({
  companyLogoUrl,
  successProfileReportSoftSkills,
  projectName,
  contentRoleLevel,
  assessmentSummary,
  projectCreatedAt,
}) => {
  const legendTypes = Array.from(
    successProfileReportSoftSkills.reduce((acc, curr) => {
      return acc.add(curr.type);
    }, new Set<SoftSkillType>([]))
  );

  return (
    <SuccessProfileReportPageContainer
      className="FirstPage"
      pageKey="firstPage"
      projectName={projectName}
      projectCreatedAt={projectCreatedAt}
      companyLogoUrl={companyLogoUrl}
    >
      <SuccessProfileSoftSkillTypesLegend softSkillTypes={legendTypes} />
      <div className="FirstPage__SuccessProfileReportConvergenceWrapper">
        <SuccessProfileReportConvergence
          successProfileReportSoftSkills={successProfileReportSoftSkills}
          projectName={projectName}
        />
      </div>
      <RoleLevelChart roleLevel={contentRoleLevel} />
      <AssessmentSummary assessmentSummary={assessmentSummary} />
      <AssessmentLinks
        assessmentIndirectInvitationUrl={
          assessmentSummary.indirectInvitationUrl
        }
      />
    </SuccessProfileReportPageContainer>
  );
};

export default FirstPage;
