import Layout from '@/components/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';

const FinancialGrantlayout = () => {
  return (
    <Layout.Main>
      <Outlet />
    </Layout.Main>
  );
};

export default FinancialGrantlayout;
