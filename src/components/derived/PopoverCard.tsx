import React from 'react';
import { PopOver, PopOverBody } from '@/components/utils/PopOvers';
import { Text } from '../core';
interface Props {
  title: string;
  target: string;
  toggle: () => void;
  isOpen: boolean;
  children?: React.ReactNode;
  direction?: any;
}
export default function PopoverCard(props: Props) {
  const { target, toggle, isOpen, title, children, direction } = props;
  return (
    <PopOver
      trigger="legacy"
      target={target}
      toggle={toggle}
      placement={direction ? direction : 'bottom-end'}
      isOpen={isOpen}>
      <Text typeface="medium" variant="h6" className="px-3 py-2 border-bottom">
        {title}
      </Text>
      <PopOverBody>{children}</PopOverBody>
    </PopOver>
  );
}
