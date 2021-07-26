import React, { FC } from 'react';
import ExternalLink from '../../../../atoms/ExternalLink/ExternalLink';
import './AssessmentLinks.scss';

interface IAssessmentLinks {
  assessmentIndirectInvitationUrl: string;
}

const AssessmentLinks: FC<IAssessmentLinks> = ({
  assessmentIndirectInvitationUrl,
}) => {
  return (
    <div className="AssessmentLinks">
      <ExternalLink
        href={assessmentIndirectInvitationUrl}
        className="AssessmentLinks__ButtonLink"
      >
        Click here to try the test
      </ExternalLink>
      <p className="AssessmentLinks__Text">or copy this link into a browser</p>
      <p className="AssessmentLinks__TextLink">
        {assessmentIndirectInvitationUrl}
      </p>
    </div>
  );
};

export default AssessmentLinks;
