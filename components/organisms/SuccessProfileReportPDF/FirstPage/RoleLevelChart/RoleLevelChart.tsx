import React, { FC } from 'react';
import { ContentRoleLevel } from '../../../../../enums/successProfile.enum';
import { ReactComponent as RoleLevel1EmptyIcon } from '../../../../../icons/roleLevel/RoleLevel1Empty.svg';
import { ReactComponent as RoleLevel1FilledIcon } from '../../../../../icons/roleLevel/RoleLevel1Filled.svg';
import { ReactComponent as RoleLevel2EmptyIcon } from '../../../../../icons/roleLevel/RoleLevel2Empty.svg';
import { ReactComponent as RoleLevel2FilledIcon } from '../../../../../icons/roleLevel/RoleLevel2Filled.svg';
import { ReactComponent as RoleLevel3EmptyIcon } from '../../../../../icons/roleLevel/RoleLevel3Empty.svg';
import { ReactComponent as RoleLevel3FilledIcon } from '../../../../../icons/roleLevel/RoleLevel3Filled.svg';
import { ReactComponent as RoleLevel4EmptyIcon } from '../../../../../icons/roleLevel/RoleLevel4Empty.svg';
import { ReactComponent as RoleLevel4FilledIcon } from '../../../../../icons/roleLevel/RoleLevel4Filled.svg';
import { ReactComponent as RoleLevel5EmptyIcon } from '../../../../../icons/roleLevel/RoleLevel5Empty.svg';
import { ReactComponent as RoleLevel5FilledIcon } from '../../../../../icons/roleLevel/RoleLevel5Filled.svg';
import './RoleLevelChart.scss';

interface IRoleLevelChart {
  roleLevel: ContentRoleLevel;
}

const RoleLevelChart: FC<IRoleLevelChart> = ({ roleLevel }) => {
  const renderBars = () => {
    return (
      <div className="RoleLevelChart__Bars">
        <div className="RoleLevelChart__Bars__Item">
          {roleLevel === ContentRoleLevel.APPRENTICE ? (
            <RoleLevel1FilledIcon />
          ) : (
            <RoleLevel1EmptyIcon />
          )}
        </div>
        <div className="RoleLevelChart__Bars__Item">
          {roleLevel === ContentRoleLevel.INDIVIDUAL_CONTRIBUTOR ? (
            <RoleLevel2FilledIcon />
          ) : (
            <RoleLevel2EmptyIcon />
          )}
        </div>
        <div className="RoleLevelChart__Bars__Item">
          {roleLevel === ContentRoleLevel.MANAGER ? (
            <RoleLevel3FilledIcon />
          ) : (
            <RoleLevel3EmptyIcon />
          )}
        </div>
        <div className="RoleLevelChart__Bars__Item">
          {roleLevel === ContentRoleLevel.MANAGER_OF_MANAGERS ? (
            <RoleLevel4FilledIcon />
          ) : (
            <RoleLevel4EmptyIcon />
          )}
        </div>
        <div className="RoleLevelChart__Bars__Item">
          {roleLevel === ContentRoleLevel.LEADER ? (
            <RoleLevel5FilledIcon />
          ) : (
            <RoleLevel5EmptyIcon />
          )}
        </div>
      </div>
    );
  };

  const renderLegend = () => {
    return (
      <div className="RoleLevelChart__Legend">
        <p
          className={`RoleLevelChart__Legend__Item${
            roleLevel === ContentRoleLevel.APPRENTICE
              ? ' RoleLevelChart__Legend__Item--Selected'
              : ''
          }`}
        >
          Apprentice
        </p>
        <p
          className={`RoleLevelChart__Legend__Item${
            roleLevel === ContentRoleLevel.INDIVIDUAL_CONTRIBUTOR
              ? ' RoleLevelChart__Legend__Item--Selected'
              : ''
          }`}
        >
          Individual Contributor
        </p>
        <p
          className={`RoleLevelChart__Legend__Item${
            roleLevel === ContentRoleLevel.MANAGER
              ? ' RoleLevelChart__Legend__Item--Selected'
              : ''
          }`}
        >
          Manager
        </p>
        <p
          className={`RoleLevelChart__Legend__Item${
            roleLevel === ContentRoleLevel.MANAGER_OF_MANAGERS
              ? ' RoleLevelChart__Legend__Item--Selected'
              : ''
          }`}
        >
          Manager of Manager
        </p>
        <p
          className={`RoleLevelChart__Legend__Item${
            roleLevel === ContentRoleLevel.LEADER
              ? ' RoleLevelChart__Legend__Item--Selected'
              : ''
          }`}
        >
          Leader
        </p>
      </div>
    );
  };

  return (
    <div className="RoleLevelChart">
      {renderBars()}
      {renderLegend()}
    </div>
  );
};

export default RoleLevelChart;
