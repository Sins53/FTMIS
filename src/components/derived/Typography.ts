import { coolGray } from '@/theme/colors';
import styled from 'styled-components';
import { Text } from '../core';
import { Display1 } from '../core/Text';

export const UnderlinedText = styled(Text)`
  color: ${(props) => props.theme.color.primary};
  font-weight: 600;
  &:after {
    content: '';
    display: block;
    margin: 0 auto;
    margin-top: 0.7rem;
    height: 2px;
    width: 3rem;
    background-color: ${(props) => props.theme.color.primary};
  }
`;

export const Description = styled(Display1)`
  color: ${coolGray[600]};
  font-weight: 400;
`;
