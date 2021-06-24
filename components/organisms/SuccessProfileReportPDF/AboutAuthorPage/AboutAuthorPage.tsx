import React, { FC } from 'react';
import './AboutAuthorPage.scss';
import SuccessProfileReportPageContainer from '../SuccessProfileReportPageContainer/SuccessProfileReportPageContainer';
import Avatar from '../../../atoms/Avatar/Avatar';
import ExternalLink from '../../../atoms/ExternalLink/ExternalLink';

interface IAboutAuthorPage {
  companyLogoUrl?: string | undefined;
  projectName: string;
  projectCreatedAt: string;
}

const AboutAuthorPage: FC<IAboutAuthorPage> = ({
  companyLogoUrl,
  projectName,
  projectCreatedAt,
}) => {
  return (
    <SuccessProfileReportPageContainer
      className="AboutAuthorPage"
      projectName={projectName}
      projectCreatedAt={projectCreatedAt}
      pageKey="aboutAuthorPage"
      companyLogoUrl={companyLogoUrl}
    >
      <div className="AboutAuthorPage__Headline">
        <Avatar
          user={{
            name: {
              firstName: 'Nick',
              lastName: 'Show',
            },
            imageUrl: `${process.env.PUBLIC_URL}/Nick.png`,
          }}
          className="AboutAuthorPage__Headline__Avatar"
        />
        <h2 className="AboutAuthorPage__Headline__Heading AboutAuthorPage__Headline__Name">
          Nick Shaw
        </h2>
        <p className="AboutAuthorPage__Headline__Paragraph">
          CCO, Spotted Zebra
        </p>
        <p className="AboutAuthorPage__Headline__Paragraph">
          nick.shaw@spottedzebra.co.uk
        </p>
        <p className="AboutAuthorPage__Headline__Paragraph">07814 136123</p>
        <ExternalLink
          className="AboutAuthorPage__Headline__Link AboutAuthorPage__Headline__Paragraph"
          href="https://www.linkedin.com/in/nick-shaw-08458a5/"
        >
          LinkedIn
        </ExternalLink>
      </div>
      <div className="AboutAuthorPage__Summary">
        <p className="AboutAuthorPage__Summary__Paragraph">
          Nick has worked in the HR tech industry for nearly 20 years,
          delivering industry-leading solutions to some of the world's most
          well-known enterprises.
        </p>
        <p className="AboutAuthorPage__Summary__Paragraph">
          Combining commercial expertise with deep technical expertise, Nick has
          a unique insight into the challenges that business leaders face and
          the role that people measurement can play in solving these issues.
        </p>
        <p className="AboutAuthorPage__Summary__Paragraph">
          Nick is frequently asked to comment on the world of work, talent and
          assessment issues in both mainstream and HR trade publications, and
          has presented at multiple industry conferences globally.
        </p>
        <p className="AboutAuthorPage__Summary__Paragraph">
          His education includes a BA from Durham University, an MSc from UMIST
          (University of Manchester), and he is a Chartered Psychologist and
          Associate Fellow of the British Psychological Society.
        </p>
        <p className="AboutAuthorPage__Summary__FinalParagraph">
          We hope that this information will be valuable in enabling you to
          embed the behaviours you require from high performing Demo Graduates.
          We look forward to partnering with you on this as you continue the
          journey. However, should you have any questions regarding the details
          of this report, please feel free to contact.
        </p>
      </div>
    </SuccessProfileReportPageContainer>
  );
};

export default AboutAuthorPage;
