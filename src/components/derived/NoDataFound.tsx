import React from 'react';
import EmptyState from '@/assets/image/empty-state.png';
import { FlexBox, Image, Text } from '../core';
import styled from 'styled-components';
import { gray } from '@/theme/colors';
interface Props {
  title: string;
  description?: string;
}

const StyledDescription = styled(Text)`
  margin-top: 0.5rem;
  color: ${gray[600]};
  font-size: 0.75rem;
`;
export default function NoDataFound(props: Props) {
  const { title, description } = props;
  return (
    <FlexBox direction="column" align="center">
      <Image src={EmptyState} />
      <Text className="mt-3">{title}</Text>
      {description && <StyledDescription variant="p">{description}</StyledDescription>}
    </FlexBox>
  );
}
