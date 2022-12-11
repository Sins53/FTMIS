import { blue, gray, green, red, yellow } from '@/theme/colors';
import React from 'react';
import styled from 'styled-components';
import { Box, Text } from '../../core';
import { badgeStyles } from './badgeProps';

interface Props {
  children?: React.ReactNode;
  className?: string;
  text?: string | number;
  bgColor:
    | 'primary'
    | 'warning'
    | 'danger'
    | 'success'
    | 'secondary'
    | 'darkWarning'
    | 'darkDanger'
    | 'darkDanger'
    | 'high'
    | 'medium'
    | 'low'
    | 'not_reliable'
    | 'na';
  textColor?: string;
}

export const colors = {
  primary: '#BBDEFB',
  warning: '#FEF08A',
  danger: '#FECACA',
  success: '#BBF7D0',
  secondary: '#EBEBEB',
  darkWarning: '#A16207',
  darkSuccess: ' #166534',
  darkDanger: '#991B1B',
  high: green[400],
  medium: blue[400],
  low: yellow[400],
  not_reliable: gray[400],
  na: red[400]
};

const DefaultBadge = styled(Box)<Props>`
  background-color: ${(props) => colors[props.bgColor]};
  color: ${badgeStyles.textColor};
  padding: ${badgeStyles.padding};
  border-radius: ${badgeStyles.borderRadius};
  margin-right: ${badgeStyles.marginRight};
  display: inline-block;
  flex-shrink: 0;
`;
const Badge = (props: Props) => {
  return (
    <DefaultBadge {...props}>
      <Text variant="display2" color={props.textColor}>
        {props.text}
      </Text>
    </DefaultBadge>
  );
};
export default Badge;
