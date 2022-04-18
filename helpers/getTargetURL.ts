import { candidateUrls, companyUrls } from '../constants/webUrlServers';
import { Application } from '../interfaces/Applications';
import { Server } from '../interfaces/Servers';

const getApplication: { [key in Application]: Server } = {
  [Application.CANDIDATE]: candidateUrls,
  [Application.COMPANY]: companyUrls,
};

export const getTargetUrl = (application: Application): string => {
  const currentUrl = window.location.href;

  if (currentUrl.includes('localhost')) {
    return getApplication[application].localhost;
  }
  if (currentUrl.includes('dev')) {
    if (currentUrl.includes('dev2')) {
      return getApplication[application].dev2;
    } else return getApplication[application].dev;
  }
  if (currentUrl.includes('staging')) {
    return getApplication[application].stage;
  }
  return getApplication[application].production;
};
