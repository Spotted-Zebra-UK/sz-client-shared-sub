import './ModuleSelector.scss';
import { CmAllowedAreaType, useCmAllowedAreaQuery } from 'generated/graphql';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getTargetUrl } from '../../../../helpers/getTargetURL';
// import IC_EMPLOYEE from '../../../../icons/ic_employee.svg';
import { Application } from '../../../../interfaces/Applications';
import ModuleSelectorDropdown from './ModuleSelectorDropdown/ModuleSelectorDropdown';
import ModuleSelectorItem from './ModuleSelectorItem/ModuleSelectorItem';

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

  useEffect(() => {
    document.addEventListener('mousedown', e => handleClick(e));
    return () => {
      document.removeEventListener('mousedown', e => handleClick(e));
    };
  }, [showDropdown]);

  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setShowDropdown(false);
    }
  };

  const dropdownItemClicked = (module: CmAllowedAreaType) => {
    if (fromCompany) {
      if (changeSelectedModule) changeSelectedModule(module);

      if (module === CmAllowedAreaType.CompanyEmployee) {
        if (!location.pathname.includes('employees'))
          history.push('/employees');
      } else {
        if (!location.pathname.includes('projects')) history.push('/projects');
      }
    } else {
      window.open(`${getTargetUrl(Application.COMPANY)}/projects`, '_self');
    }
    setShowDropdown(false);
  };

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

  const checkLengthOfModules = (modules: CmAllowedAreaType[]): boolean => {
    return modules.length > 1;
  };

  const showCmModule: { [key in string]: React.ReactElement } = {
    [CmAllowedAreaType.Hiring]: (
      <ModuleSelectorItem
        key={selectedModule}
        module={CmAllowedAreaType.Hiring}
        onClick={() => {
          setShowDropdown(showDropdown => !showDropdown);
        }}
        selectedItem
      />
    ),
    [CmAllowedAreaType.TalentReview]: (
      <ModuleSelectorItem
        key={selectedModule}
        module={CmAllowedAreaType.TalentReview}
        onClick={() => {
          setShowDropdown(showDropdown => !showDropdown);
        }}
        selectedItem
      />
    ),
    [CmAllowedAreaType.CompanyEmployee]: (
      <ModuleSelectorItem
        key={selectedModule}
        module={CmAllowedAreaType.CompanyEmployee}
        onClick={() => {
          setShowDropdown(showDropdown => !showDropdown);
        }}
        selectedItem
      />
    ),
  };
  if (selectedModule && checkLengthOfModules(modules))
    return (
      <div className="module-selector" ref={ref}>
        {showCmModule[selectedModule]}

        {showDropdown && (
          <ModuleSelectorDropdown
            modules={modules.filter(m => m !== selectedModule)}
            onDropdownItemClick={dropdownItemClicked}
          />
        )}
      </div>
    );
  return null;
};

export default ModuleSelector;
