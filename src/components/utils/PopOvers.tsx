import React from 'react';
import {
  Popover as RPopover,
  PopoverProps,
  PopoverHeader,
  PopoverBody,
  PopoverHeaderProps,
  PopoverBodyProps,
  UncontrolledPopoverProps,
  UncontrolledPopover as RUncontrolledPopover
} from 'reactstrap';

interface PopOverProperties extends PopoverProps {
  children?: React.ReactNode;
}
interface UncontrolledPopOverProperties extends UncontrolledPopoverProps {
  children?: React.ReactNode;
}
interface PopOverHeaderProperties extends PopoverHeaderProps {
  children?: React.ReactNode;
}
interface PopOverBodyProperties extends PopoverBodyProps {
  children?: React.ReactNode;
}

function PopOver(props: PopOverProperties) {
  return <RPopover {...props} />;
}
function PopOverHeader(props: PopOverHeaderProperties) {
  return <PopoverHeader {...props} />;
}
function PopOverBody(props: PopOverBodyProperties) {
  return <PopoverBody {...props} />;
}
function UncontrolledPopover(props: UncontrolledPopOverProperties) {
  return <RUncontrolledPopover {...props} />;
}

export { PopOver, PopOverHeader, PopOverBody, UncontrolledPopover };
