import Layout from '@/components/layout';
import { Outlet } from 'react-router-dom';

function UserManagement() {
  return (
    <Layout.Main>
      <Outlet />
    </Layout.Main>
  );
}

export default UserManagement;
