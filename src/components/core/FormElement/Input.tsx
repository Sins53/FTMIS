import { Sizes } from '../props';
import styled, { css } from 'styled-components';
import { InputHTMLAttributes, useRef } from 'react';
import { commonFormStyle, componentFormStyle, formPropertyStyles } from './formProps';
import { Box } from '..';
import { convertToRoman } from '@/utils/romanizeMap';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldSize?: Sizes;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  isNepali?: boolean;
}
export function componentIconStyle(fieldSize: Sizes) {
  switch (fieldSize) {
    case Sizes.md:
      return css`
        font-size: 1rem;
      `;
    case Sizes.sm:
      return css`
        font-size: 0.75rem;
      `;
    default:
      return css`
        font-size: 0.875rem;
      `;
  }
}

const StyledIcon = styled(Box)<InputProps>`
  color: ${formPropertyStyles.iconColor};
  ${(props) => {
    return `
      ${componentIconStyle(props.fieldSize as Sizes)}
    
    `;
  }};
`;

const StyledInput = styled.input<InputProps>`
  ${commonFormStyle}
  flex-grow:1;
  &:disabled {
    background-color: #e9ecef;
  }
`;
const LeftIconContainer = styled(StyledIcon)`
  margin-right: 1rem;
  display: inline-flex;
`;
const RightIconContainer = styled(StyledIcon)`
  margin-left: 1rem;
  display: inline-flex;
  margin-right: 1rem;
`;

const StyledInputWrapper = styled.div<InputProps>`
  ${commonFormStyle}
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;

  ${StyledInput} {
    border: none;
    // padding-left: 0;
    // padding-right: 0;
    ${(props) => {
      return `
        ${componentFormStyle(props.fieldSize as Sizes)}
      
      `;
    }};
  }
`;

export default function Input({ fieldSize = Sizes.md, ...args }: InputProps) {
  const { leftIcon, rightIcon, isNepali } = args;

  const focusPoint = useRef<HTMLDivElement>(null);
  const handleFocus = () => {
    focusPoint && focusPoint.current && focusPoint.current.focus();
  };
  return (
    <>
      {leftIcon || rightIcon ? (
        <StyledInputWrapper {...args} fieldSize={fieldSize} ref={focusPoint}>
          {leftIcon && (
            <LeftIconContainer component="span" {...args}>
              {leftIcon}
            </LeftIconContainer>
          )}
          <StyledInput
            {...args}
            fieldSize={fieldSize}
            onFocus={handleFocus}
            onChange={(e) => {
              if (isNepali) {
                e.target.value = convertToRoman(e.target.value);
              }
            }}
          />
          {rightIcon && <RightIconContainer {...args}>{rightIcon}</RightIconContainer>}
        </StyledInputWrapper>
      ) : (
        <StyledInputWrapper {...args} fieldSize={fieldSize} ref={focusPoint}>
          <StyledInput
            {...args}
            fieldSize={fieldSize}
            onChange={(e) => {
              if (isNepali) {
                e.target.value = convertToRoman(e.target.value);
              }
            }}
          />
        </StyledInputWrapper>
      )}
    </>
  );
}
