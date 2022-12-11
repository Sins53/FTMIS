import React from 'react';
import styled from 'styled-components';
import { Box } from '../core';

interface Props {
  leftComponent: {
    size: number;
    component: React.FunctionComponent;
  };
  rightComponent?: {
    size: number;
    component: React.FunctionComponent;
  };
}
const StyledRow = styled(Box)`
  padding: 0 4rem;
  width: 100%;
`;

function RowLayout({ leftComponent, rightComponent }: Props): React.ReactElement {
  return (
    <>
      <StyledRow>
        {leftComponent}
        {rightComponent}
      </StyledRow>
    </>
  );
}

export default RowLayout;
