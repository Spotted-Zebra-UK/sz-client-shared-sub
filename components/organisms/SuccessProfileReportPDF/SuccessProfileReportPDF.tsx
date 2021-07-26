import React, { FC } from 'react';
import { TSuccessProfileReport } from '../../../helpers/successProfileReport.interface';
import { PagesContextStore } from '../../../contexts/PageContext';
import CoverPage from './CoverPage/CoverPage';
import FirstPage from './FirstPage/FirstPage';
import SoftSkillsSummaryPages from './SoftSkillsSummaryPages/SoftSkillsSummaryPages';
import SuccessProfileSoftSkillDataSourcesPage from './SuccessProfileSoftSkillDataSourcesPage/SuccessProfileSoftSkillDataSourcesPage';
import AboutAuthorPage from './AboutAuthorPage/AboutAuthorPage';
import ExampleInterviewQuestionPage from './ExampleInterviewQuestionPage/ExampleInterviewQuestionPage';

interface ISuccessProfileReportPDF {
  successProfileReport: TSuccessProfileReport;
}

const SuccessProfileReportPDF: FC<ISuccessProfileReportPDF> = ({
  successProfileReport: {
    projectName,
    createdAt,
    companyLogoUrl,
    softSkills,
    roleLevel,
    assessmentSummary,
    softSkillTypesSummary,
    notIncludedSoftSkills,
  },
}) => {
  return (
    <PagesContextStore>
      <CoverPage
        projectName={projectName}
        createdAt={createdAt}
        companyLogoUrl={companyLogoUrl}
      />
      <FirstPage
        companyLogoUrl={companyLogoUrl}
        successProfileReportSoftSkills={softSkills}
        projectName={projectName}
        projectCreatedAt={createdAt}
        contentRoleLevel={roleLevel}
        assessmentSummary={assessmentSummary}
      />
      <SoftSkillsSummaryPages
        softSkillTypesSummary={softSkillTypesSummary}
        companyLogoUrl={companyLogoUrl}
        successProfileReportSoftSkills={softSkills}
        projectName={projectName}
        projectCreatedAt={createdAt}
      />
      <SuccessProfileSoftSkillDataSourcesPage
        companyLogoUrl={companyLogoUrl}
        successProfileReportSoftSkills={softSkills}
        notIncludedSoftSkills={notIncludedSoftSkills}
        projectName={projectName}
        projectCreatedAt={createdAt}
      />
      <ExampleInterviewQuestionPage
        companyLogoUrl={companyLogoUrl}
        projectName={projectName}
        projectCreatedAt={createdAt}
      />
      <AboutAuthorPage
        companyLogoUrl={companyLogoUrl}
        projectName={projectName}
        projectCreatedAt={createdAt}
      />
    </PagesContextStore>
  );
};

export default SuccessProfileReportPDF;
