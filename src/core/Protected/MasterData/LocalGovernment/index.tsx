import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import React from 'react';
import LocalGovernmentTable from './LocalGovernmentTable';

function LocalGovernment() {
  return (
    <>
      <Layout.Header>
        <HeaderTitle>Local Government Setup</HeaderTitle>
      </Layout.Header>
      <Box className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <LocalGovernmentTable />
        </Layout.Container>
      </Box>
    </>
  );
}

export default LocalGovernment;
