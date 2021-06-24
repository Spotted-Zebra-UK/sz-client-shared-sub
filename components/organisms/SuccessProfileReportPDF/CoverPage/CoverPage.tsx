import React, { FC } from 'react';
import { format } from 'date-fns';
import './CoverPage.scss';
import Bubble from '../../../atoms/Bubble/Bubble';
import SuccessProfileReportPageContainer from '../SuccessProfileReportPageContainer/SuccessProfileReportPageContainer';

interface ICoverPage {
  projectName: string;
  createdAt: string;
  companyLogoUrl?: string | undefined;
}

const CoverPage: FC<ICoverPage> = ({
  projectName,
  createdAt,
  companyLogoUrl,
}) => {
  const createdAtString = format(new Date(createdAt), 'dd MMMM yyyy');

  return (
    <SuccessProfileReportPageContainer
      className="CoverPage"
      pageKey="coverPage"
      hasTopBorderFooter={false}
      hasSuccessProfileInfoFooter={false}
    >
      <Bubble className="CoverPage__PurpleBubble" />
      <Bubble className="CoverPage__GreenBubble" />
      <Bubble className="CoverPage__BlueBubble" />

      <div className="CoverPage__Main">
        <h3 className="CoverPage__Main__Title">SuccessProfile</h3>
        <h2 className="CoverPage__Main__ProjectName">{projectName}</h2>
        <p className="CoverPage__Main__CreatedAt">Created {createdAtString}</p>
      </div>
    </SuccessProfileReportPageContainer>
  );
};

export default CoverPage;
