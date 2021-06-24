/* eslint-disable @typescript-eslint/indent */
import { FunctionComponent, SVGProps } from 'react';
import { SoftSkillDataSourceType } from '../enums/successProfile.enum';
import { ReactComponent as EmployeeAssessmentIcon } from '../icons/dataSources/EmployeeAssessment.svg';
import { ReactComponent as EmployeeSurveyIcon } from '../icons/dataSources/EmployeeSurvey.svg';
import { ReactComponent as IndustryIcon } from '../icons/dataSources/Industry.svg';
import { ReactComponent as ManagerSurveyIcon } from '../icons/dataSources/ManagerSurvey.svg';

export const DataSourcesIcons: {
  [key in SoftSkillDataSourceType]: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;
} = {
  [SoftSkillDataSourceType.EMPLOYEE_ASSESSMENT]: EmployeeAssessmentIcon,
  [SoftSkillDataSourceType.EMPLOYEE_SURVEY]: EmployeeSurveyIcon,
  [SoftSkillDataSourceType.INDUSTRY]: IndustryIcon,
  [SoftSkillDataSourceType.MANAGER_SURVEY]: ManagerSurveyIcon,
};
