import './ModuleSelectorItem.scss';
import IC_ARROW from 'assets/icons/ic_down-arrow_small.svg';
import IC_EMPLOYEE from 'assets/icons/ic_employee.svg';
import IC_RECRUITER from 'assets/icons/ic_recruitment.svg';
import IC_TALENT_REVIEW from 'assets/icons/ic_talent_review.svg';
import { CmAllowedAreaType } from 'generated/graphql';
import { FC } from 'react';

interface IModuleSelectorItem {
  module: CmAllowedAreaType;
  selectedItem?: boolean;
  onClick: () => void;
}

const ModuleSelectorItem: FC<IModuleSelectorItem> = ({
  module,
  selectedItem,
  onClick,
}) => {
  const moduleSelectorText: { [key in CmAllowedAreaType]: string } = {
    [CmAllowedAreaType.CompanyEmployee]: 'Employees',
    [CmAllowedAreaType.Hiring]: 'Recruitment',
    [CmAllowedAreaType.TalentReview]: 'Talent Review',
  };
  const moduleSelectorIcon: { [key in CmAllowedAreaType]: string } = {
    [CmAllowedAreaType.CompanyEmployee]: IC_EMPLOYEE,
    [CmAllowedAreaType.Hiring]: IC_RECRUITER,
    [CmAllowedAreaType.TalentReview]: IC_TALENT_REVIEW,
  };

  return (
    <div
      className={
        selectedItem
          ? 'selected_module_item_container'
          : 'module_item_container'
      }
      onClick={onClick}
    >
      <div className="module_item_sub_container">
        <img
          src={moduleSelectorIcon[module]}
          alt="ic-recruter"
          className="icon"
        />
        <div className="module-title-div">{moduleSelectorText[module]}</div>
      </div>
      {selectedItem && (
        <img src={IC_ARROW} alt="ic-recruter" className="icon-arrow" />
      )}
    </div>
  );
};

export default ModuleSelectorItem;
