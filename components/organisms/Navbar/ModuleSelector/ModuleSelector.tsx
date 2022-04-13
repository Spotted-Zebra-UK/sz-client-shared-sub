import './ModuleSelector.scss';
import { ProjectModuleType, useCmModuleAccessQuery } from 'generated/graphql';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IC_ARROW from '../../../../icons/ic_down-arrow_small.svg';
import IC_RECRUITER from '../../../../icons/ic_recruitment.svg';

interface IModuleSelector {
  selectedModuleProp?: ProjectModuleType;
}

const ModuleSelector: FC<IModuleSelector> = ({ selectedModuleProp }) => {
  const [modules, setModules] = useState<ProjectModuleType[]>([]);
  const [selectedModule, setSelectedModule] = useState<
    ProjectModuleType | undefined
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
  useCmModuleAccessQuery({
    onCompleted: data => {
      const cmModuleAccess = data.CmModuleAccess;
      if (cmModuleAccess?.defaultModule) {
        setModules(cmModuleAccess?.modules as ProjectModuleType[]);
        if (!selectedModuleProp)
          setSelectedModule(cmModuleAccess?.defaultModule);
      }
    },
  });

  const showCmModule: { [key in string]: React.ReactElement } = {
    [ProjectModuleType.Hiring]: (
      <div
        className={
          selectedModule === ProjectModuleType.Hiring
            ? 'module-div'
            : 'second-module-div'
        }
      >
        <div
          onClick={e => {
            history.push('/projects');
            if (selectedModule === ProjectModuleType.Hiring) {
              e.preventDefault();
              setShowDropdown(showDropdown => !showDropdown);
            }
          }}
          className="project-module-first-div"
        >
          <img src={IC_RECRUITER} alt="ic-recruter" className="icon" />
          <div className="module-title-div">Recruitment</div>
        </div>
        {selectedModule === ProjectModuleType.Hiring && (
          <img src={IC_ARROW} alt="ic-recruter" className="icon-arrow" />
        )}
      </div>
    ),
    [ProjectModuleType.TalentReview]: (
      <div
        className={
          selectedModule === ProjectModuleType.Hiring
            ? 'second-module-div'
            : 'module-div'
        }
      >
        <div
          onClick={() => {
            setShowDropdown(false);
            history.push('/talent-review/4');
            if (selectedModule === ProjectModuleType.TalentReview) {
              setShowDropdown(showDropdown => !showDropdown);
            }
          }}
          className="project-module-first-div"
        >
          <img src={IC_RECRUITER} alt="ic-recruter" className="icon" />
          <div className="module-title-div">Talent Review</div>
        </div>
        {selectedModule === ProjectModuleType.TalentReview && (
          <img src={IC_ARROW} alt="ic-recruter" className="icon-arrow" />
        )}
      </div>
    ),
  };

  if (selectedModule)
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
