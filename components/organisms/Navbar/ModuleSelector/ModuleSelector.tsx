import './ModuleSelector.scss';
import { CmAccessType, useCmAccessQuery } from 'generated/graphql';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getTargetUrl } from '../../../../helpers/getTargetURL';
import IC_ARROW from '../../../../icons/ic_down-arrow_small.svg';
import IC_RECRUITER from '../../../../icons/ic_recruitment.svg';
import { Application } from '../../../../interfaces/Applications';

interface IModuleSelector {
  selectedModuleProp?: CmAccessType;
  fromCompany?: boolean;
}

const ModuleSelector: FC<IModuleSelector> = ({
  selectedModuleProp,
  fromCompany,
}) => {
  const [modules, setModules] = useState<CmAccessType[]>([]);
  const [selectedModule, setSelectedModule] = useState<
    CmAccessType | undefined
  >(selectedModuleProp);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);

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
  useCmAccessQuery({
    onCompleted: data => {
      const cmModuleAccess = data.CmAccess;
      if (cmModuleAccess?.defaultScreen) {
        setModules(cmModuleAccess?.access as CmAccessType[]);
        if (!selectedModuleProp)
          setSelectedModule(cmModuleAccess?.defaultScreen);
      }
    },
  });

  const showCmModule: { [key in string]: React.ReactElement } = {
    [CmAccessType.Hiring]: (
      <div
        className={
          selectedModule === CmAccessType.Hiring
            ? 'module-div'
            : 'second-module-div'
        }
      >
        <div
          onClick={e => {
            if (selectedModule === CmAccessType.TalentReview) {
              if (fromCompany) {
                history.push('/projects');
              } else {
                window.open(
                  `${getTargetUrl(Application.COMPANY)}/projects`,
                  '_self'
                );
              }
            }

            if (selectedModule === CmAccessType.Hiring) {
              e.preventDefault();
              setShowDropdown(showDropdown => !showDropdown);
            }
          }}
          className="project-module-first-div"
        >
          <img src={IC_RECRUITER} alt="ic-recruter" className="icon" />
          <div className="module-title-div">Recruitment</div>
        </div>
        {selectedModule === CmAccessType.Hiring && (
          <img src={IC_ARROW} alt="ic-recruter" className="icon-arrow" />
        )}
      </div>
    ),
    [CmAccessType.TalentReview]: (
      <div
        className={
          selectedModule === CmAccessType.Hiring
            ? 'second-module-div'
            : 'module-div'
        }
      >
        <div
          onClick={() => {
            if (selectedModule === CmAccessType.Hiring) {
              if (fromCompany) {
                history.push('/talent-review/4');
              } else {
                window.open(
                  `${getTargetUrl(Application.COMPANY)}/talent-review/4`,
                  '_self'
                );
              }
            }
            if (selectedModule === CmAccessType.TalentReview) {
              setShowDropdown(showDropdown => !showDropdown);
            }
          }}
          className="project-module-first-div"
        >
          <img src={IC_RECRUITER} alt="ic-recruter" className="icon" />
          <div className="module-title-div">Talent Review</div>
        </div>
        {selectedModule === CmAccessType.TalentReview && (
          <img src={IC_ARROW} alt="ic-recruter" className="icon-arrow" />
        )}
      </div>
    ),
  };

  if (selectedModule && modules.length > 0)
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
