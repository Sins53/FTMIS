import { coolGray } from '@/theme/colors';
import styled from 'styled-components';
import { View } from '../core';

interface Props {
  border?: string | undefined;
  background?: string | undefined;
}

export const BorderCard = styled(View)<Props>`
  border: 1px solid ${(props) => props.border ?? coolGray[400]};
  border-radius: 0.5rem;
  padding: 1rem 1rem 0 1rem;
  background-color: ${(props) => props.background ?? 'white'};
`;

export const ShadowCard = styled(View)<Props>`
  border: 1px solid #f0f0f0;
  box-shadow: 4px 8px 16px -8px rgba(52, 58, 64, 0.24);
  border-radius: 0.5rem;
  padding: 1rem 1rem 0 1rem;
  background-color: ${(props) => props.background ?? 'white'};
`;
