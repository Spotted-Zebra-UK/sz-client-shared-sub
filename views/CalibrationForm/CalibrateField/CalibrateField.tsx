import React, { FC } from 'react';
import CalibrateSlider from '../../../components/atoms/Slider/CalibrateSlider';

interface ICalibrateField {
  index: number;
  icon: string;
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
      <div className="calibration__form__item__heading">
        <img src={icon} alt="icon" />
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
