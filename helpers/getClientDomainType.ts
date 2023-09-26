import { ClientDomainType } from 'generated/graphql';

export const getClientDomainType = (clientType?: string): ClientDomainType => {
  if (clientType === 'candidate') return ClientDomainType.CandidateAppDomain;
  else if (clientType === 'company') return ClientDomainType.CompanyAppDomain;
  else if (clientType === 'admin') return ClientDomainType.AdminAppDomain;
  else return ClientDomainType.CandidateAppDomain;
};
