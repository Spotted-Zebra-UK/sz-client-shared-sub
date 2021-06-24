import { format } from 'date-fns';
import React, { FC, useContext } from 'react';
import { PagesContext } from '../../../../../contexts/PageContext';
import { ReactComponent as SpottedZebraLogo } from '../../../../../icons/SpottedZebraLogo.svg';
import './PageFooter.scss';

interface IPageFooter {
  hasTopBorder?: boolean;
  hasInfo?: boolean;
  pageKey: string;
  projectName?: string | undefined;
  projectCreatedAt?: string | undefined;
}

const PageFooter: FC<IPageFooter> = ({
  hasTopBorder = true,
  pageKey,
  projectName,
  projectCreatedAt,
  hasInfo = true,
}) => {
  const pageContext = useContext(PagesContext);
  const pageNumber = pageContext.pages[pageKey];
  const createdAtString = projectCreatedAt
    ? format(new Date(projectCreatedAt), 'dd MMMM yyyy')
    : '';

  return (
    <div
      className={`PageFooter${
        hasTopBorder ? ' PageFooter--WithTopBorder' : ''
      }`}
    >
      <div className="PageFooter__Left">
        <SpottedZebraLogo className="PageFooter__Logo" />
      </div>
      <div className="PageFooter__Right">
        {hasInfo ? (
          <div className="PageFooter__Info">
            {projectName} | Success profile created {createdAtString}
          </div>
        ) : null}
        <div className="PageFooter__PageNumber">{pageNumber}</div>
      </div>
    </div>
  );
};

export default PageFooter;
