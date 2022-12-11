import React from 'react';

interface Props {
  component?: 'div' | 'span' | 'aside' | 'main' | 'header' | 'section' | 'footer' | 'ul' | 'li';
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const Box = ({ children, className, component: Component = 'div' }: Props): React.ReactElement => {
  return <Component className={className}>{children}</Component>;
};

export default Box;
