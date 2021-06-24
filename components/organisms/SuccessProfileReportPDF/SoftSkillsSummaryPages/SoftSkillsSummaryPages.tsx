import React, { FC } from 'react';
import { SoftSkillType } from '../../../../enums/successProfile.enum';
import {
  TSuccessProfileReportSoftSkillTypeSummary,
  TSuccessProfileReportSoftSkill,
} from '../../../../helpers/successProfileReport.interface';

import SoftSkillsSummaryPage from './SoftSkillsSummaryPage/SoftSkillsSummaryPage';

interface ISoftSkillsSummaryPages {
  softSkillTypesSummary: TSuccessProfileReportSoftSkillTypeSummary[];
  successProfileReportSoftSkills: TSuccessProfileReportSoftSkill[];
  companyLogoUrl: string | undefined;
  projectName: string;
  projectCreatedAt: string;
}

/**
 * Dynamicaly generates soft skill summary pages.
 * Soft skill summary pages should be grouped by success profile soft skill type.
 * check: https://app.zeplin.io/project/5f06cf2452e3b96eba4941a4/screen/60a2c18dfb260c249d4ddc8f
 */
const SoftSkillsSummaryPages: FC<ISoftSkillsSummaryPages> = ({
  softSkillTypesSummary,
  successProfileReportSoftSkills,
  companyLogoUrl,
  projectName,
  projectCreatedAt,
}) => {
  /**
   * Groups soft skill summaries by pages for specified type.
   * On first page of specific type should be type summary and two soft skill summaries.
   * On every other page should be three soft skill summaries.
   */
  const groupSoftSkillsSummariesByPagesForType = (
    type: SoftSkillType
  ): TSuccessProfileReportSoftSkill[][] => {
    const differentiatorSoftSkills = successProfileReportSoftSkills.filter(
      softSkill => softSkill.type === type
    );

    if (!differentiatorSoftSkills.length) {
      return [];
    }

    return differentiatorSoftSkills.reduce((acc, curr, index) => {
      if (index === 0) {
        return [[curr]];
      }

      if (index === 1) {
        return [[...acc[0], curr]];
      }

      const softSkillPageIndex = Math.floor((index - 2) / 3) + 1;

      if (acc[softSkillPageIndex]) {
        acc[softSkillPageIndex].push(curr);

        return acc;
      }

      return [...acc, [curr]];
    }, [] as TSuccessProfileReportSoftSkill[][]);
  };

  /**
   * Renders soft skill summary pages for specified type.
   */
  const renderSoftSkillsPagesForType = (type: SoftSkillType) => {
    const groupedSoftSkillsByPage = groupSoftSkillsSummariesByPagesForType(
      type
    );

    const differentiatorSoftSkillSummary = softSkillTypesSummary.find(
      softSkillSummary => softSkillSummary.type === type
    );

    if (!groupedSoftSkillsByPage.length || !differentiatorSoftSkillSummary) {
      return null;
    }

    return (
      <>
        {groupedSoftSkillsByPage.map((_softSkillsGroup, index) => (
          <SoftSkillsSummaryPage
            key={groupedSoftSkillsByPage[index][0].id}
            pageKey={`SoftSkillsPage--${groupedSoftSkillsByPage[index][0].id}`}
            companyLogoUrl={companyLogoUrl}
            softSkillTypeSummary={
              index === 0 ? differentiatorSoftSkillSummary : undefined
            }
            successProfileReportSoftSkills={groupedSoftSkillsByPage[index]}
            projectCreatedAt={projectCreatedAt}
            projectName={projectName}
          />
        ))}
      </>
    );
  };

  return (
    <>
      {renderSoftSkillsPagesForType(SoftSkillType.DIFFERENTIATOR)}
      {renderSoftSkillsPagesForType(SoftSkillType.CORE)}
      {renderSoftSkillsPagesForType(SoftSkillType.DIVERSITY)}
    </>
  );
};

export default SoftSkillsSummaryPages;
