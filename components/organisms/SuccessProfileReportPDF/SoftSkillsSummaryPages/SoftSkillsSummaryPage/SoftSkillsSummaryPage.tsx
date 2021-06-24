import React, { FC } from 'react';
import {
  TSuccessProfileReportSoftSkillTypeSummary,
  TSuccessProfileReportSoftSkill,
} from '../../../../../helpers/successProfileReport.interface';
import SuccessProfileReportPageContainer from '../../SuccessProfileReportPageContainer/SuccessProfileReportPageContainer';

import SuccessProfileSoftSkillSummary from '../SuccessProfileSoftSkillSummary/SuccessProfileSoftSkillSummary';
import SuccessProfileSoftSkillTypeSummary from '../SuccessProfileSoftSkillTypeSummary/SuccessProfileSoftSkillTypeSummary';
import './SoftSkillsSummaryPage.scss';

interface ISoftSkillsSummaryPage {
  softSkillTypeSummary?: TSuccessProfileReportSoftSkillTypeSummary | undefined;
  successProfileReportSoftSkills: TSuccessProfileReportSoftSkill[];
  companyLogoUrl: string | undefined;
  pageKey: string;
  projectName: string;
  projectCreatedAt: string;
}

const SoftSkillsSummaryPage: FC<ISoftSkillsSummaryPage> = ({
  companyLogoUrl,
  softSkillTypeSummary,
  successProfileReportSoftSkills,
  pageKey,
  projectName,
  projectCreatedAt,
}) => {
  return (
    <SuccessProfileReportPageContainer
      className="SoftSkillsSummaryPage"
      pageKey={pageKey}
      projectCreatedAt={projectCreatedAt}
      projectName={projectName}
      companyLogoUrl={companyLogoUrl}
    >
      {softSkillTypeSummary ? (
        <SuccessProfileSoftSkillTypeSummary
          type={softSkillTypeSummary.type}
          title={softSkillTypeSummary.title}
          summary={softSkillTypeSummary.summary}
        />
      ) : null}
      {successProfileReportSoftSkills.map(successProfileReportSoftSkill => (
        <SuccessProfileSoftSkillSummary
          key={successProfileReportSoftSkill.id}
          softSkillId={successProfileReportSoftSkill.softSkillId}
          name={successProfileReportSoftSkill.name}
          mainText={successProfileReportSoftSkill.mainText}
          successProfileSoftSkillType={successProfileReportSoftSkill.type}
        />
      ))}
    </SuccessProfileReportPageContainer>
  );
};

export default SoftSkillsSummaryPage;
