import { base, coolGray, green } from '@/theme/colors';
import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import { FlexBox, Text } from '../core';

const getMinMax = (min: number, max: number) => ({
  min: min > max ? max : min,
  max: max > min ? max : min
});

const RangeSlider: React.FC<{
  range: number;
  setRange: any;
  min: number;
  max: number;
  step: number;
  label: string;
  labelDirection: string;
  disabled?: boolean;
}> = (props) => {
  const { range, setRange, max, min, step, label, labelDirection } = props;

  const minMax = getMinMax(+min, +max);
  const getValue = (range: number) => {
    if (range < minMax.min) {
      return minMax.min;
    } else if (range > minMax.max) {
      return minMax.max;
    }
    return range;
  };

  return (
    <div className="range">
      {minMax.min === minMax.max ? (
        <div></div>
      ) : (
        <>
          <Range
            disabled={props.disabled || false}
            step={step}
            min={minMax.min}
            max={minMax.max}
            values={[getValue(props.range)]}
            onChange={(values) => setRange(values[0])}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '1.5rem',
                  display: 'flex',
                  width: '100%'
                }}>
                <div
                  ref={props.ref}
                  style={{
                    height: '.25rem',
                    width: '100%',
                    borderRadius: '.25rem',

                    background: getTrackBackground({
                      values: [range],
                      colors: [`${base.primary}`, `${green[100]}`],
                      min: minMax.min,
                      max: minMax.max
                    }),
                    alignSelf: 'center'
                  }}>
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '1rem',
                  width: '1rem',
                  backgroundColor: `${base.primary}`,
                  borderRadius: '50%',
                  outline: 'none'
                }}
              />
            )}
          />
          <FlexBox align="center" justify="space-between" className="label">
            {labelDirection === 'left' ? (
              <>
                <Text variant="display1" color={coolGray[600]}>
                  {label}&nbsp;{min}
                </Text>
                <Text variant="display1" color={coolGray[600]}>
                  {label}&nbsp;{max}
                </Text>
              </>
            ) : (
              <>
                <Text variant="display1" color={coolGray[600]}>
                  {minMax.min}&nbsp;{label}
                </Text>
                <Text variant="display1" color={coolGray[600]}>
                  {minMax.max}&nbsp;{label}
                </Text>
              </>
            )}
          </FlexBox>
        </>
      )}
    </div>
  );
};

export default RangeSlider;
