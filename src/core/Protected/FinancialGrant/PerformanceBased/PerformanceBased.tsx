import { Box, FlexBox } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import React from 'react';
import PerformanceIndicators from './PerformanceIndicators';

const PerformanceBased = () => {
  return (
    <>
      <Layout.Header backToList>
        <HeaderTitle variant="h5" typeface="semiBold">
          Performance Based Grant
        </HeaderTitle>
      </Layout.Header>

      <Box className="position-relative flex-grow-1 w-100">
        <Layout.Container stretch>
          <FlexBox direction="column" className="h-100 w-100">
            <PerformanceIndicators />
          </FlexBox>
        </Layout.Container>
      </Box>
    </>
  );
};

export default PerformanceBased;
