import './ModuleSelectorDropdown.scss';
import { FC } from 'react';
import { CmAllowedAreaType } from '../../../../../../../generated/graphql';
import ModuleSelectorItem from '../ModuleSelectorItem/ModuleSelectorItem';

interface IModuleSelectorDropdown {
  modules: CmAllowedAreaType[];
  onDropdownItemClick: (module: CmAllowedAreaType) => void;
}

const ModuleSelectorDropdown: FC<IModuleSelectorDropdown> = ({
  modules,
  onDropdownItemClick,
}) => {
  return (
    <div className="module_selector_dropdown_container">
      {modules.map(module => (
        <ModuleSelectorItem
          key={module}
          onClick={() => onDropdownItemClick(module)}
          module={module}
        />
      ))}
    </div>
  );
};

export default ModuleSelectorDropdown;
