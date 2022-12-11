import { ReactElement } from 'react';
import Layout from '@/components/layout';
import Sidebar from '@/core/Protected/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import ScreenLoader from '@/components/Modal/ScreenLoader';

const ProtectedLayout = (): ReactElement => {
  const { loadingLogout } = useAuth();
  return (
    <Layout.Wrapper>
      {loadingLogout && <ScreenLoader />}
      <Layout.Base>
        <Sidebar />
        <Outlet />
      </Layout.Base>
    </Layout.Wrapper>
  );
};

export default ProtectedLayout;
