export enum ExternalSites {
  AMPED = 'Amped',
}

export enum ExternalAuthenticationActions {
  REPORT = 'report',
  INVITE = 'invite',
}

export type TExternalAuthenticationAmpedUrlParams = {
  token: string;
  site: ExternalSites;
  action: ExternalAuthenticationActions;
  firstName?: string;
  lastName?: string;
  projectId?: number;
  stageId?: number;
  reportId?: string;
};

export type TExternalAuthenticationUrlParams = TExternalAuthenticationAmpedUrlParams;

export const getExternalAuthenticationUrlParams = (
  urlSearch: string
): TExternalAuthenticationAmpedUrlParams => {
  const queryParams = new URLSearchParams(urlSearch);
  const result: TExternalAuthenticationAmpedUrlParams = {} as TExternalAuthenticationAmpedUrlParams;

  result.token = queryParams.get('token') as string;
  result.site =
    (queryParams.get('site') as ExternalSites) || ExternalSites.AMPED;
  result.action =
    (queryParams.get('action') as ExternalAuthenticationActions) ||
    ExternalAuthenticationActions.INVITE;
  result.firstName = queryParams.get('firstName') || undefined;
  result.lastName = queryParams.get('lastName') || undefined;

  const projectIdString = queryParams.get('projectId');
  result.projectId = projectIdString
    ? parseInt(projectIdString, 10)
    : undefined;

  const stageIdString = queryParams.get('stageId');
  result.stageId = stageIdString ? parseInt(stageIdString, 10) : undefined;

  result.reportId = queryParams.get('reportId') || undefined;

  return result;
};
