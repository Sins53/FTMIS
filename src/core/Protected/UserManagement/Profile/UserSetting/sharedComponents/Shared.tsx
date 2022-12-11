import { Box, Text } from '@/components/core';
import { base, coolGray } from '@/theme/colors';
import styled from 'styled-components';

export const Card = styled(Box)`
  background-color: ${coolGray[100]};
`;

export const PrimaryText = styled(Text)`
  color: ${base.primary};
`;

export const GreyText = styled(Text)`
  color: ${coolGray[700]};
`;
