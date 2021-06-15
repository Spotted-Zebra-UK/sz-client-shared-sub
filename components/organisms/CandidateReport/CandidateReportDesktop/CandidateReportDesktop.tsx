import './CandidateReportDesktop.scss';
import React, { FC } from 'react';
import {
  ICandidateReportData,
  TCandidateReportSoftSkill,
} from '../../../../interfaces/candidateReport';
import CandidateReportFooter from '../../../molecules/CandidateReportFooter/CandidateReportFooter';
import CandidateReportHeaderDesktop from '../../../molecules/CandidateReportHeaderDesktop/CandidateReportHeaderDesktop';
import SoftSkillOverviewFull from '../../../molecules/SoftSkillOverviewFull/SoftSkillOverviewFull';
import TypeScores from '../../../molecules/TypeScores/TypeScores';
import SoftSkillResults from '../../SoftSkillResults/SoftSkillResults';
import SoftSkillSynergy from '../../SoftSkillSynergy/SoftSkillSynergy';

interface ICandidateReportDesktop {
  candidateReport: ICandidateReportData;
  isHeaderVisible?: boolean | undefined;
}

const CandidateReportDesktop: FC<ICandidateReportDesktop> = props => {
  const { candidateReport, isHeaderVisible = true } = props;
  const {
    softSkills,
    totalScore,
    totalGrade,
    topSkills,
    toImprove,
    candidate,
    typeScores,
    createdAt,
  } = candidateReport;

  return (
    <div className="CandidateReportDesktop">
      {isHeaderVisible ? (
        <CandidateReportHeaderDesktop position={candidate.role} />
      ) : null}

      <div className="Wrapper">
        <SoftSkillSynergy
          softSkills={softSkills}
          totalScore={totalScore}
          totalGrade={totalGrade}
        />

        <TypeScores typeScores={typeScores} />

        {topSkills.length > 0 && (
          <SoftSkillResults
            heading="Top soft skills"
            caption="These skills will enable your success:"
            softSkills={topSkills}
          />
        )}

        {toImprove.length > 0 && (
          <SoftSkillResults
            heading="Soft skills to improve"
            caption="Focus on these development areas to improve your performance:"
            softSkills={toImprove}
          />
        )}

        {softSkills.map((softSkill: TCandidateReportSoftSkill) => {
          return (
            <SoftSkillOverviewFull key={softSkill.id} softSkill={softSkill} />
          );
        })}

        <CandidateReportFooter
          position={candidate.role}
          reportDate={createdAt || '20 July 2020'}
        />
      </div>
    </div>
  );
};

export default CandidateReportDesktop;
