import React, { FC } from 'react';

interface ICompanyLogo {
  url: string;
  name: string;
}

const CompanyLogo: FC<ICompanyLogo> = props => {
  const { url, name } = props;

  return url ? (
    <img src={url} alt={`${name}.svg`} className="CompanyLogo" />
  ) : (
    <h5 className="CompanyName">{name}</h5>
  );
};

export default CompanyLogo;
