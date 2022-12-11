import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { decodeData } from '@/utils/utilsFunction/encode-decode';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AccessMapping from './AccessMapping';
import UserDetail from './UserDetail';
import { UserDetails } from './UserScreen/schema';
import UserScreen from './UserScreen/UserScreen';
import { useScreenListByUserIdData } from './UserScreen/userScreenQueries';

function Roles(): JSX.Element {
  const [menuId, setMenuId] = useState<number>();
  const [showPrivilege, setShowPrivilege] = useState<boolean>(false);
  const { id } = useParams();
  const decodedId = decodeData(id);
  console.log(decodedId, 'param');

  const {
    data: screenList
    // isLoading: screenListLoading,
    // isSuccess: screenListFetched
  } = useScreenListByUserIdData(`${decodedId}`);

  return (
    <>
      <Layout.Header backToList={true}>
        <HeaderTitle>User Role Mapping</HeaderTitle>
      </Layout.Header>
      <Box className="flex-grow-1 position-relative">
        <Layout.Absolute>
          <Box className="row g-0 h-100">
            <Box className="col-lg-4 col-xl-4 border-right ">
              <UserDetail userData={screenList?.data?.user as UserDetails} />
            </Box>
            <Box className="col-lg-4 border-right ">
              <UserScreen
                userId={Number(decodedId)}
                setMenuId={setMenuId}
                setShowPrivilege={setShowPrivilege}
                menuList={screenList?.data?.menu || []}
              />
            </Box>
            <Box className="col-lg-4 ">
              <AccessMapping
                userId={Number(decodedId)}
                menuId={Number(menuId)}
                showPrivilege={showPrivilege}
              />
            </Box>
          </Box>
        </Layout.Absolute>
      </Box>
    </>
  );
}

export default Roles;
