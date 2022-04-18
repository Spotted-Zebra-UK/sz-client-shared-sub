import { Server } from '../interfaces/Servers';

export const candidateUrls: Server = {
  localhost: 'http://localhost:3006/company',
  dev2: 'https://dev2-candidate.spottedzebra.co.uk/company',
  dev: 'https://dev-candidate.spottedzebra.co.uk/company',
  stage: 'https://staging-candidate.spottedzebra.co.uk/company',
  production: 'https://candidate.spottedzebra.co.uk/company',
};
export const companyUrls: Server = {
  localhost: 'http://localhost:3000/company',
  dev2: 'https://dev2-company.spottedzebra.co.uk/',
  dev: 'https://dev2-company.spottedzebra.co.uk/',
  stage: 'https://staging-company.spottedzebra.co.uk/',
  production: 'https://company.spottedzebra.co.uk/',
};
