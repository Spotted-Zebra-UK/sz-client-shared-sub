import React, { FC } from 'react';
import DataSourcesLegendItem from './DataSourcesLegendItem/DataSourcesLegendItem';
import './DataSourcesLegend.scss';
import { SoftSkillDataSourceType } from '../../../../../enums/successProfile.enum';
import { TSuccessProfileReportSoftSkill } from '../../../../../helpers/successProfileReport.interface';

interface IDataSourcesLegend {
  successProfileReportSoftSkills: TSuccessProfileReportSoftSkill[];
}

const DataSourcesLegend: FC<IDataSourcesLegend> = ({
  successProfileReportSoftSkills,
}) => {
  const softSkillDataSourcTypes = Array.from(
    new Set(
      successProfileReportSoftSkills.reduce((acc, curr) => {
        const softSkillDataSourceTypes = curr.dataSources.map(
          dataSource => dataSource.type
        );

        return [...acc, ...softSkillDataSourceTypes];
      }, [] as SoftSkillDataSourceType[])
    )
  );

  return (
    <div className="DataSourcesLegend">
      {softSkillDataSourcTypes.map(dataSourceType => (
        <DataSourcesLegendItem
          key={dataSourceType}
          dataSourceType={dataSourceType}
        />
      ))}
    </div>
  );
};

export default DataSourcesLegend;
