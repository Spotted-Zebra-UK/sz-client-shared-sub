import React, { FC } from 'react';

interface ICompanyLogo {
  url: string;
  name: string;
}

const CompanyLogo: FC<ICompanyLogo> = props => {
  const { url, name } = props;

  return (
    <img
      src={url}
      alt={`${name}.svg`}
      className="CompanyLogo"
    />
  );
};

export default CompanyLogo;
