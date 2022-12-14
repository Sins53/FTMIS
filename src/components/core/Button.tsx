import React from 'react';
import styled, { css } from 'styled-components';

//https://dev.to/vovacodesca/building-reusable-components-using-typescript-react-and-styled-components-1apo
//https://spectrum.chat/styled-components/general/use-defaultprops-with-typescript~dc3cc541-6998-455e-88f5-3df1932443bf

interface ButtonProps {
  variant?: 'outlined' | 'contained' | 'text';
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: null | React.ReactNode;
  rightIcon?: null | React.ReactNode;
  onClick?: (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const buttonVariantStyle = (variant: 'outlined' | 'contained' | 'text') => {
  switch (variant) {
    case 'contained':
      return css`
        display: inline-flex;
      `;
    default:
      return css``;
  }
};

const StyledButton = styled.button<ButtonProps>`
   {
    ${({ variant }) => {
      return variant && buttonVariantStyle(variant);
    }}
  }
`;

const LeftIconContainer = styled.span`
  padding-right: 0.25rem;
`;

const RightIconContainer = styled.span`
  padding-left: 0.25rem;
`;

const Button: React.FC<ButtonProps> = ({
  loading = false,
  variant = 'contained',
  leftIcon,
  rightIcon,
  children,
  className,
  onClick
}) => {
  return (
    <StyledButton variant={variant} className={className} onClick={onClick}>
      {loading ? (
        'test'
      ) : (
        <>
          <LeftIconContainer>{leftIcon && leftIcon}</LeftIconContainer>
          {children}
          <RightIconContainer>{rightIcon && rightIcon}</RightIconContainer>
        </>
      )}
    </StyledButton>
  );
};

export default Button;
