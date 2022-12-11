import { Box } from '@/components/core';
import { blue } from '@/theme/colors';
import styled from 'styled-components';

export const StyledInformationBox = styled(Box)`
  display: flex;
  border: 1px solid ${blue[600]};
  padding: 1rem;
  margin: 1rem 1.5rem;
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;
