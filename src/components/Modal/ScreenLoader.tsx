import { Box } from '../core';

import React from 'react';
import Spinner from '../Spinner/Spinner';

export default function ScreenLoader() {
  return (
    <Box className="screen-loader">
      <Spinner type />
    </Box>
  );
}
