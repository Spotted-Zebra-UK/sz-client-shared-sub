import './ModuleSelector.scss';
import { CmAllowedAreaType, useCmAllowedAreaQuery } from 'generated/graphql';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getTargetUrl } from '../../../../helpers/getTargetURL';
import IC_ARROW from '../../../../icons/ic_down-arrow_small.svg';
// import IC_EMPLOYEE from '../../../../icons/ic_employee.svg';
import IC_RECRUITER from '../../../../icons/ic_recruitment.svg';
import IC_TALENT_REVIEW from '../../../../icons/ic_talent_review.svg';
import { Application } from '../../../../interfaces/Applications';

interface IModuleSelector {
  selectedModule?: CmAllowedAreaType;
  fromCompany?: boolean;
  changeSelectedModule?: (moduleType: CmAllowedAreaType) => void;
}

const ModuleSelector: FC<IModuleSelector> = ({
  selectedModule,
  fromCompany,
  changeSelectedModule,
}) => {
  const [modules, setModules] = useState<CmAllowedAreaType[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const history = useHistory();
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', e => handleClick(e));
    return () => {
      document.removeEventListener('mousedown', e => handleClick(e));
    };
  }, [showDropdown]);

  useCmAllowedAreaQuery({
    onCompleted: data => {
      const cmModuleAccess = data.CmAllowedArea;
      if (cmModuleAccess?.defaultArea) {
        setModules(cmModuleAccess?.allowed as CmAllowedAreaType[]);
        if (!selectedModule && cmModuleAccess?.defaultArea) {
          if (changeSelectedModule)
            changeSelectedModule(cmModuleAccess?.defaultArea);
        }
      }
    },
  });

  const showCmModule: { [key in string]: React.ReactElement } = {
    [CmAllowedAreaType.Hiring]: (
      <div
        className={
          selectedModule === CmAllowedAreaType.Hiring
            ? 'module-div'
            : 'second-module-div'
        }
        onClick={e => {
          if (selectedModule === CmAllowedAreaType.TalentReview) {
            if (fromCompany) {
              if (changeSelectedModule)
                changeSelectedModule(CmAllowedAreaType.Hiring);
              if (!location.pathname.includes('projects'))
                history.push('/projects');
            } else {
              window.open(
                `${getTargetUrl(Application.COMPANY)}/projects`,
                '_self'
              );
            }
          }
          setShowDropdown(showDropdown => !showDropdown);
        }}
      >
        <div className="project-module-first-div">
          <img src={IC_RECRUITER} alt="ic-recruter" className="icon" />
          <div className="module-title-div">Recruitment</div>
        </div>
        {selectedModule === CmAllowedAreaType.Hiring && (
          <img src={IC_ARROW} alt="ic-recruter" className="icon-arrow" />
        )}
      </div>
    ),
    [CmAllowedAreaType.TalentReview]: (
      <div
        className={
          selectedModule === CmAllowedAreaType.Hiring
            ? 'second-module-div'
            : 'module-div'
        }
        onClick={e => {
          if (selectedModule === CmAllowedAreaType.Hiring) {
            if (fromCompany) {
              if (changeSelectedModule)
                changeSelectedModule(CmAllowedAreaType.TalentReview);
              if (!location.pathname.includes('projects'))
                history.push('/projects');
            } else {
              window.open(
                `${getTargetUrl(Application.COMPANY)}/projects`,
                '_self'
              );
            }
          }
          setShowDropdown(showDropdown => !showDropdown);
        }}
      >
        <div className="project-module-first-div">
          <img src={IC_TALENT_REVIEW} alt="ic-recruter" className="icon" />
          <div className="module-title-div">Talent Review</div>
        </div>
        {selectedModule === CmAllowedAreaType.TalentReview && (
          <img src={IC_ARROW} alt="ic-recruter" className="icon-arrow" />
        )}
      </div>
    ),
  };

  if (selectedModule && modules.length > 1)
    return (
      <div className="module-selector" ref={ref}>
        {showDropdown
          ? modules.map((cm, i) => <>{showCmModule[cm]}</>)
          : showCmModule[selectedModule]}
      </div>
    );
  return null;
};

export default ModuleSelector;
