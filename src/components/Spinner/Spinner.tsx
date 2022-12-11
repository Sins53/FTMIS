import React from 'react';
import { FlexBox } from '../core';

interface SpinnerProps {
  type?: boolean;
}

const Spinner = (props: SpinnerProps): React.ReactElement => {
  const { type } = props;
  return (
    <FlexBox align="center" justify="center" className="h-100 w-100">
      <div className={`spinner-border ${type && 'text-white'}`} role="status">
        <span className="sr-only"></span>
      </div>
    </FlexBox>
  );
};

export default Spinner;
