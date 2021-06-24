/* eslint-disable max-len */
import React, { FC, useContext, useEffect } from 'react';
import PageContainer from '../../../../../../components/molecules/PageContainer/PageContainer';
import { PagesContext } from '../../../../contexts/PageContext';
import PageFooter from './PageFooter/PageFooter';
import PageHeader from './PageHeader/PageHeader';

interface ISuccessProfileReportPageContainer {
  className?: string | undefined;
  pageKey: string;
  projectName?: string | undefined;
  projectCreatedAt?: string | undefined;
  companyLogoUrl?: string | undefined;
  hasTopBorderFooter?: boolean | undefined;
  hasSuccessProfileInfoFooter?: boolean;
}

const SuccessProfileReportPageContainer: FC<ISuccessProfileReportPageContainer> = ({
  children,
  className,
  pageKey,
  projectName,
  projectCreatedAt,
  companyLogoUrl,
  hasTopBorderFooter = true,
  hasSuccessProfileInfoFooter = true,
}) => {
  const pagesContext = useContext(PagesContext);

  useEffect(() => {
    pagesContext.addPage(pageKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      className={`SuccessProfileReportPageContainer${
        className ? ` ${className}` : ''
      }`}
      footer={
        <PageFooter
          hasInfo={hasSuccessProfileInfoFooter}
          hasTopBorder={hasTopBorderFooter}
          pageKey={pageKey}
          projectName={projectName}
          projectCreatedAt={projectCreatedAt}
        />
      }
      header={<PageHeader companyLogoUrl={companyLogoUrl} />}
    >
      {children}
    </PageContainer>
  );
};

export default SuccessProfileReportPageContainer;
