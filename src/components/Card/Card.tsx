import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  background?: string;
  borderRadius?: string;
  shadow?: '1' | '2' | '3' | '4';
  dotted?: boolean;
  onClick?: (e: any) => void;
  bordered?: boolean;
  select?: boolean;
}

function cardShadow(shadow: CardProps['shadow']) {
  switch (shadow) {
    case '1':
      return css`
        /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
         */
        filter: drop-shadow(0px 4px 8px rgba(21, 101, 192, 0.04))
          drop-shadow(0px 2px 4px rgba(21, 101, 192, 0.08));
      `;
    case '2':
      return css`
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
      `;
    case '3':
      return css`
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.12);
      `;
    case '4':
      return css`
        box-shadow: 0px 16px 12px rgba(0, 0, 0, 0.12);
      `;

    default:
      return css`
        box-shadow: none;
      `;
  }
}

const CardSelect = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 87px;
  width: 153px;
  border: 1px solid #d4d7db;
  background-color: white;
  border-radius: 8px;
  padding: 0.5rem;
  position: relative;
  cursor: pointer;
  i,
  svg {
    color: #333e5a;
    flex-shrink: 0;
    font-size: 20px;
    margin-bottom: 0.5rem;
  }
  &::after {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
    width: 1rem;
    top: 0.5rem;
    position: absolute;
    right: 0.5rem;
    border-radius: 50%;
  }
`;

const StyledCard = styled.div<CardProps>`
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '8px')};
  background: ${({ background }) => (background ? background : 'white')};
  padding: 1.5rem;
  ${(props) => {
    return `${cardShadow(props.shadow)}`;
  }}

  ${(props) => {
    return (
      props.bordered &&
      `
    `
    );
  }};

  ${(props) => {
    return props.select && CardSelect;
  }}
`;

export default function Card({ children, className, ...args }: CardProps) {
  return (
    <StyledCard className={className} {...args}>
      {children}
    </StyledCard>
  );
}
