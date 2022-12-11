import Layout from '@/components/layout';
import { Outlet } from 'react-router-dom';

function RoleManagement() {
  return (
    <Layout.Main>
      <Outlet />
    </Layout.Main>
  );
}

export default RoleManagement;
