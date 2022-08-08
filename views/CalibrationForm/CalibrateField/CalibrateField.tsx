import React, { FC } from 'react';
import ReactTooltip from 'react-tooltip';
import CalibrateSlider from '../../../components/atoms/Slider/CalibrateSlider';
import { ICalibrateFieldIcon } from '../helper/useCalibrateForm';

interface ICalibrateField {
  index: number;
  icon: ICalibrateFieldIcon;
  softsSkill: {
    __typename?: 'SoftSkill' | undefined;
    name: string;
    id: number;
  };
  initialData: number;
  onChangeHandler: (value: number, index: number) => void;
  totalScore: number;
  currentData: number;
  showInitialField?: boolean;
  isScreenCompleted?: boolean;
  showHandlerLabel?: boolean;
  handlerLabel?: string;
}

const CalibrateField: FC<ICalibrateField> = ({
  index,
  icon,
  softsSkill,
  initialData,
  onChangeHandler,
  totalScore,
  currentData,
  showInitialField = true,
  isScreenCompleted = false,
  showHandlerLabel,
  handlerLabel,
}) => {
  return (
    <div className="calibration__form__item">
      <ReactTooltip
        type="light"
        className="tooltip-container"
        effect="solid"
        multiline={true}
        place={'bottom'}
      />
      <div className="calibration__form__item__heading">
        <img data-tip={icon.tip} src={icon.img} alt="icon" />
        <span>{softsSkill.name}</span>
      </div>

      <div className="calibration__form__item__range-selector">
        {showInitialField && (
          <CalibrateSlider
            value={initialData}
            name={softsSkill.name}
            index={index}
            onChange={onChangeHandler}
            handleSize={40}
            totalPoints={totalScore}
            trackStyles={{
              backgroundColor: 'transparent',
              height: '2px',
              borderRadius: '2px',
            }}
            initial={true}
            disabled={true}
          />
        )}

        <CalibrateSlider
          value={currentData}
          name={softsSkill.name}
          index={index}
          onChange={onChangeHandler}
          handleSize={40}
          totalPoints={totalScore}
          trackStyles={{
            backgroundColor: 'transparent',
            height: '2px',
            borderRadius: '2px',
          }}
          initial={false}
          initalDisabled={!showInitialField}
          isScreenCompleted={isScreenCompleted}
          handlerLabel={handlerLabel}
          showHandlerLabel={showHandlerLabel}
        />
      </div>
    </div>
  );
};

export default CalibrateField;
