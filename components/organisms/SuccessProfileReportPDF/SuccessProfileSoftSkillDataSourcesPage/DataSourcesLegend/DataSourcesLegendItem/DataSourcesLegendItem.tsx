import React, { FC } from 'react';
import { DataSourcesIcons } from '../../../../../../constants/dataSources';
import { SoftSkillDataSourceType } from '../../../../../../enums/successProfile.enum';

import './DataSourcesLegendItem.scss';

interface IDataSourcesLegendItem {
  dataSourceType: SoftSkillDataSourceType;
}

const dataSourceTitlesObj: { [key in SoftSkillDataSourceType]: string } = {
  [SoftSkillDataSourceType.EMPLOYEE_ASSESSMENT]: 'Manager survey',
  [SoftSkillDataSourceType.EMPLOYEE_SURVEY]: 'Employee survey',
  [SoftSkillDataSourceType.INDUSTRY]: 'Industry',
  [SoftSkillDataSourceType.MANAGER_SURVEY]: 'Manager survey',
};

const DataSourcesLegendItem: FC<IDataSourcesLegendItem> = ({
  dataSourceType,
}) => {
  const Icon = DataSourcesIcons[dataSourceType];
  const title = dataSourceTitlesObj[dataSourceType];
  return (
    <div className="DataSourcesLegendItem">
      <div className="DataSourcesLegendItem__Icon">
        <Icon />
      </div>
      <p className="DataSourcesLegendItem__Title">{title}</p>
    </div>
  );
};

export default DataSourcesLegendItem;
