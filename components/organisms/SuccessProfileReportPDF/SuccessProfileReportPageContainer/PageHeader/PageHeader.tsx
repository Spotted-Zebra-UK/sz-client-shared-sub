import React, { FC } from 'react';
import './PageHeader.scss';

interface IPageHeader {
  companyLogoUrl?: string | undefined;
}

const PageHeader: FC<IPageHeader> = ({ companyLogoUrl }) => {
  return (
    <div className="PageHeader">
      {companyLogoUrl ? (
        <img
          className="PageHeader__CompanyLogo"
          src={companyLogoUrl}
          alt="company-logo"
        />
      ) : null}
    </div>
  );
};

export default PageHeader;
