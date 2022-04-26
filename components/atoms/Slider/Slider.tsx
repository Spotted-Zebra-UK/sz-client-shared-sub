import 'rc-slider/assets/index.css';
import './Slider.scss';
import range from 'lodash/range';
import RCSlider, { Handle } from 'rc-slider';
import { FC, useMemo } from 'react';
import { ReactComponent as DragmeIcon } from '../../../libs/sz-client-shared-sub/icons/Dragme.svg';
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
  onChange: (value: number, name: string) => void;
  min?: number;
  max?: number;
  startPoint?: number;
  handleSize?: number;
  marks?: ISliderMarks;
  trackStyles?: React.CSSProperties;
}

const generateMarks = (
  handleSize: number,
  propsMarks?: ISliderMarks,
  min: number = 0,
  max: number = 100
) => {
  const values = range(min, max + 1);
  const defaultStyle = {
    color: 'transparent',
    width: handleSize,
    height: handleSize + 14,
    marginTop: -20 - handleSize / 2,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 2,
    zIndex: 1,
  };

  return values.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]:
        propsMarks && propsMarks[curr]
          ? {
              style: {
                ...defaultStyle,
                color: 'black',
                ...propsMarks[curr].style,
              },
              label: propsMarks[curr].label,
            }
          : {
              style: defaultStyle,
              label: ' ',
            },
    };
  }, {});
};

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
  ...props
}) => {
  const handleChange = (newValue: number) => {
    onChange(newValue, name);
  };

  const sliderWrapperStyle = useMemo(
    () => ({
      padding: handleSize / 2,
    }),
    [handleSize]
  );
  const handleStyle = useMemo(
    () => ({
      ...baseHandleStyle,
      height: handleSize,
      width: handleSize,
      marginTop: -(handleSize / 2),
      zIndex: 2,
    }),
    [handleSize]
  );
  const handleIconSize =
    (handleSize * DEFAULT_HANDLE_ICON_SIZE) / DEFAULT_HANDLE_SIZE;

  const generatedMarks = useMemo(
    () => generateMarks(handleSize, marks, min, max),
    [handleSize, marks, min, max]
  );

  return (
    <div style={sliderWrapperStyle} className="Slider">
      <RCSlider
        handle={({
          dragging,
          ariaValueTextFormatter,
          reverse,
          ref,
          ...handleProps
        }) => (
          <Handle {...handleProps}>
            <DragmeIcon width={handleIconSize} height={handleIconSize} />
          </Handle>
        )}
        handleStyle={handleStyle}
        onChange={handleChange}
        value={value}
        trackStyle={trackStyles}
        dots
        marks={generatedMarks}
        min={min}
        max={max}
        {...props}
      />
    </div>
  );
};

export default Slider;
