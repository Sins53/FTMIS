import React from 'react';
import Box from './Box';
import FlexBox, { FlexBoxProps } from './FlexBox';

interface Props extends FlexBoxProps {
  component?: 'Box' | 'Flexbox';
  children?: React.ReactNode;
  className?: string;
}

const View = ({ component = 'Box', ...args }: Props): React.ReactElement => {
  switch (component) {
    case 'Flexbox':
      return <FlexBox {...args} />;
    case 'Box':
      return <Box {...args} />;
    default:
      return <Box {...args} />;
  }
};

export default View;
