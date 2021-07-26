import React, { FC } from 'react';
import {
  TSuccessProfileReportSoftSkill,
  TSuccessProfileReportNotIncludedSoftSkills,
} from '../../../../helpers/successProfileReport.interface';
import SuccessProfileReportPageContainer from '../SuccessProfileReportPageContainer/SuccessProfileReportPageContainer';
import DataSourcesLegend from './DataSourcesLegend/DataSourcesLegend';
import NotIncludedSoftSkills from './NotIncludedSoftSkills/NotIncludedSoftSkills';
import SoftSkillDataSources from './SoftSkillDataSources/SoftSkillDataSources';
import './SuccessProfileSoftSkillDataSourcesPage.scss';

interface ISuccessProfileSoftSkillDataSourcesPage {
  companyLogoUrl: string | undefined;
  successProfileReportSoftSkills: TSuccessProfileReportSoftSkill[];
  notIncludedSoftSkills: TSuccessProfileReportNotIncludedSoftSkills;
  projectName: string;
  projectCreatedAt: string;
}

const SuccessProfileSoftSkillDataSourcesPage: FC<ISuccessProfileSoftSkillDataSourcesPage> = ({
  companyLogoUrl,
  successProfileReportSoftSkills,
  notIncludedSoftSkills,
  projectName,
  projectCreatedAt,
}) => {
  return (
    <SuccessProfileReportPageContainer
      className="SuccessProfileSoftSkillDataSourcesPage"
      pageKey="dataSourcesPage"
      projectCreatedAt={projectCreatedAt}
      projectName={projectName}
      companyLogoUrl={companyLogoUrl}
    >
      <DataSourcesLegend
        successProfileReportSoftSkills={successProfileReportSoftSkills}
      />
      <SoftSkillDataSources
        successProfileReportSoftSkills={successProfileReportSoftSkills}
      />
      <NotIncludedSoftSkills notIncludedSoftSkills={notIncludedSoftSkills} />
    </SuccessProfileReportPageContainer>
  );
};

export default SuccessProfileSoftSkillDataSourcesPage;
