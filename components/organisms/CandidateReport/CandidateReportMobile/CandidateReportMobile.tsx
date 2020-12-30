import './CandidateReportMobile.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { FC, useEffect } from 'react';
import Slider from 'react-slick';
import {
  ICandidateReportData,
  TCandidateReportSoftSkill,
} from '../../../../interfaces/candidateReport';
import Gauge from '../../../atoms/Gauge/Gauge';
import CandidateReportHeaderMobile from '../../../molecules/CandidateReportHeaderMobile/CandidateReportHeaderMobile';
import SoftSkillOverviewMobile from '../../../molecules/SoftSkillOverviewMobile/SoftSkillOverviewMobile';
import Bubbles from './Bubbles/Bubbles';
import { BubbleSets } from './CandidateReportMobile.constants';
import { equalizeElementsHeight } from './equalizeElementsHeight';

interface ICandidateReportMobile {
  candidateReport: ICandidateReportData;
}

const CandidateReportMobile: FC<ICandidateReportMobile> = props => {
  const { candidateReport } = props;
  const { softSkills, totalScore, totalGrade, candidate } = candidateReport;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'slider-dots',
  };

  useEffect(() => {
    equalizeElementsHeight('.SoftSkillOverviewMobile');

    window.addEventListener('resize', () => {
      equalizeElementsHeight('.SoftSkillOverviewMobile');
    });
  }, []);

  return (
    <div className="CandidateReportMobile">
      <CandidateReportHeaderMobile position={candidate.role} />
      <div className="CandidateReportMobile__Convergence">
        <Bubbles set={BubbleSets.candidateReportMobile} />
        <Gauge score={totalScore} grade={totalGrade} />
      </div>

      <div className="CandidateReportMobile__Slider">
        <Slider {...settings}>
          {softSkills.map((softSkill: TCandidateReportSoftSkill) => {
            return (
              <SoftSkillOverviewMobile
                key={softSkill.id}
                softSkill={softSkill}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default CandidateReportMobile;
