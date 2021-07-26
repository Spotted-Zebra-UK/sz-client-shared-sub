import React, { FC } from 'react';
import { DataSourcesIcons } from '../../../../../../../constants/dataSources';
import { SoftSkillIcons } from '../../../../../../../constants/softSkillIcons';
import { TSuccessProfileReportSoftSkill } from '../../../../../../../helpers/successProfileReport.interface';
import './SoftSkillDataSourcesRowCard.scss';

interface ISoftSkillDataSourcesRowCard {
  successProfileReportSoftSkill: TSuccessProfileReportSoftSkill;
}

const SoftSkillDataSourcesRowCard: FC<ISoftSkillDataSourcesRowCard> = ({
  successProfileReportSoftSkill,
}) => {
  const TitleIcon = SoftSkillIcons[successProfileReportSoftSkill.softSkillId];

  return (
    <div className="SoftSkillDataSourcesRowCard">
      <div className="SoftSkillDataSourcesRowCard__Title">
        <TitleIcon className="SoftSkillDataSourcesRowCard__Title__Icon" />
        <h6 className="SoftSkillDataSourcesRowCard__Title__Text">
          {successProfileReportSoftSkill.name}
        </h6>
      </div>
      <div className="SoftSkillDataSourcesRowCard__DataSourceIcons">
        {successProfileReportSoftSkill.dataSources.map(dataSource => {
          const DataSourceIcon = DataSourcesIcons[dataSource.type];

          return (
            <div
              className={`SoftSkillDataSourcesRowCard__DataSourceIcons__Item SoftSkillDataSourcesRowCard__DataSourceIcons__Item--${dataSource.color}`}
              key={dataSource.id}
            >
              <DataSourceIcon />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SoftSkillDataSourcesRowCard;
