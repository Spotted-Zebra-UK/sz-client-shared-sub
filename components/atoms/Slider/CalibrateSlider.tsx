import 'rc-slider/assets/index.css';
import './CalibrateSlider.scss';
import { ReactComponent as DragmeIcon } from 'assets/icons/Dragme.svg';
import { ReactComponent as CompleteIcon } from 'assets/icons/ic_completed.svg';
import RCSlider, { Handle } from 'rc-slider';
import { FC, useMemo } from 'react';
import {
  baseHandleStyle,
  DEFAULT_HANDLE_ICON_SIZE,
  DEFAULT_HANDLE_SIZE,
  trackStyle,
} from './Slider.constants';

export interface ISliderMarks {
  [key: number]: { style: object; label: string };
}

export interface ISlider {
  value: number;
  name: string;
  onChange: (value: number, index: number) => void;
  min?: number;
  max?: number;
  startPoint?: number;
  handleSize?: number;
  marks?: ISliderMarks;
  trackStyles?: React.CSSProperties;
  index: number;
  totalPoints: number;
  initial: boolean;
  disabled?: boolean;
  initalDisabled?: boolean;
  isScreenCompleted?: boolean;
  showHandlerLabel?: boolean;
  handlerLabel?: string;
}

const Slider: FC<ISlider> = ({
  handleSize = DEFAULT_HANDLE_SIZE,
  value,
  name,
  onChange,
  marks,
  min,
  max,
  trackStyles = trackStyle,
  startPoint,
  index,
  totalPoints,
  initial = false,
  disabled = false,
  initalDisabled = false,
  isScreenCompleted = false,
  showHandlerLabel = false,
  handlerLabel,
  ...props
}) => {
  const handleChange = (newValue: number, index: number) => {
    onChange(newValue, index);
  };

  const handleStyle1 = useMemo(
    () => ({
      ...baseHandleStyle,
      height: handleSize,
      width: handleSize,
      marginTop: -(handleSize / 2),
      zIndex: 2,
      backgroundColor: '#fff',
      border: '1px solid #000 !important',
      cursor: 'default',
    }),
    [handleSize]
  );
  const handleStyle2 = useMemo(
    () => ({
      ...baseHandleStyle,
      height: handleSize,
      width: handleSize,
      marginTop: -(handleSize / 2),
      zIndex: 3,
      backgroundColor: '#10b7ff',
    }),
    [handleSize]
  );
  const handleIconSize =
    (handleSize * DEFAULT_HANDLE_ICON_SIZE) / DEFAULT_HANDLE_SIZE;

  const formatHandlerLabel = (label: string): string => {
    let removedUnderscore = label.replaceAll('_', ' ');
    let labelLowerCase = removedUnderscore.toLowerCase();
    let result =
      labelLowerCase.charAt(0).toUpperCase() + labelLowerCase.slice(1);
    return result;
  };

  return (
    <div
      className={` ${initial || initalDisabled ? 'initial-slider' : 'slider'}`}
    >
      <RCSlider
        handle={({
          index,
          dragging,
          ariaValueTextFormatter,
          reverse,
          ref,
          ...handleProps
        }) => {
          return (
            <Handle key={index} disabled={true} {...handleProps}>
              {!isScreenCompleted ? (
                <DragmeIcon width={handleIconSize} height={handleIconSize} />
              ) : (
                <CompleteIcon width={handleIconSize} height={handleIconSize} />
              )}
              <div
                className={`handler-label ${showHandlerLabel ? '' : 'hide'}`}
              >
                {formatHandlerLabel(handlerLabel || '')}
              </div>
            </Handle>
          );
        }}
        handleStyle={initial ? handleStyle1 : handleStyle2 || {}}
        onChange={newValues => handleChange(newValues, index)}
        value={value}
        trackStyle={trackStyles}
        dots
        step={Math.ceil(100 / totalPoints)}
        min={0}
        max={75}
        railStyle={{
          backgroundColor: 'transparent',
          height: '2px',
          borderRadius: '2px',
        }}
        disabled={disabled || isScreenCompleted}
        {...props}
      />
    </div>
  );
};

export default Slider;
