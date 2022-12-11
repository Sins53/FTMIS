import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { decodeData } from '@/utils/utilsFunction/encode-decode';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AccessMapping from './AccessMapping';
import RoleScreen from './RoleScreen/RoleScreen';
import UserList from './UserList';

function Roles(): JSX.Element {
  const [menuId, setMenuId] = useState<number>();

  const [showPrivilege, setShowPrivilege] = useState<boolean>(false);

  const { id } = useParams();
  const decodedId = decodeData(id);

  return (
    <>
      <Layout.Header backToList={true}>
        <HeaderTitle>Create Role Management</HeaderTitle>
      </Layout.Header>
      <div className="flex-grow-1 position-relative">
        <Layout.Absolute>
          <div className="row g-0 h-100">
            <div className="col-lg-4 border-right ">
              <RoleScreen
                setMenuId={setMenuId}
                roleId={Number(decodedId)}
                setShowPrivilege={setShowPrivilege}
              />
            </div>
            <div className="col-lg-4 border-right ">
              <AccessMapping
                roleId={Number(decodedId)}
                menuId={Number(menuId)}
                showPrivilege={showPrivilege}
              />
            </div>
            <div className="col-lg-4 ">
              <UserList roleId={Number(decodedId)} />
            </div>
          </div>
        </Layout.Absolute>
      </div>
    </>
  );
}

export default Roles;
