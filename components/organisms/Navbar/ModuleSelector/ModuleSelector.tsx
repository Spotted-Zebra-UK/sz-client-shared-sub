import './ModuleSelector.scss';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ProjectModuleType,
  useCmModuleAccessQuery,
} from '../../../../generated/graphql';
import IC_ARROW from '../../../../icons/iconsSVG/ic_down-arrow_small.svg';
import IC_RECRUITER from '../../../../icons/iconsSVG/ic_recruitment.svg';

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
        onClick={() => {
          setSelectedModule(ProjectModuleType.Hiring);
        }}
      >
        <div
          onClick={() => {
            setShowDropdown(false);
            history.push('/projects');
          }}
          className="project-module-first-div"
        >
          <img src={IC_RECRUITER} alt="ic-recruter" className="icon" />
          <label className="module-title-div">Recruitment</label>
        </div>
        {selectedModule === ProjectModuleType.Hiring && (
          <img
            src={IC_ARROW}
            alt="ic-recruter"
            className="icon"
            onClick={e => {
              e.preventDefault();
              setShowDropdown(showDropdown => !showDropdown);
            }}
          />
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
        onClick={() => {
          //   setShowDropdown(false);
          history.push('/talent-review/4');

          setSelectedModule(ProjectModuleType.TalentReview);
        }}
      >
        <div
          onClick={() => {
            setShowDropdown(false);
            history.push('/talent-review/4');
          }}
          className="project-module-first-div"
        >
          <img src={IC_RECRUITER} alt="ic-recruter" className="icon" />
          <label className="module-title-div">Talent Review</label>
        </div>
        {selectedModule === ProjectModuleType.TalentReview && (
          <img
            src={IC_ARROW}
            alt="ic-recruter"
            className="icon"
            onClick={() => {
              setShowDropdown(showDropdown => !showDropdown);
            }}
          />
        )}
      </div>
    ),
  };

  if (selectedModule)
    return (
      <div className="module-selector">
        {showDropdown
          ? modules.map((cm, i) => <>{showCmModule[cm]}</>)
          : showCmModule[selectedModule]}
      </div>
    );
  return null;
};

export default ModuleSelector;
