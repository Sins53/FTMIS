import { Box, Text } from '@/components/core';
import Layout from '@/components/layout';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { base } from '@/theme/colors';
import { useState } from 'react';
import RoleSpecificUser from './RoleSpecificUser';
import { useAssignUserInRole } from './useRoleQuery';

function UserList({ roleId }: { roleId: number }): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const toggleShowOptions = () => setShowOptions(!showOptions);

  const [searchText, setSearchText] = useState<string>('');

  const { mutate: assignUserMutate, isLoading } = useAssignUserInRole(roleId);

  const handleAssignUserToRole = () => {
    assignUserMutate(
      { users: selectedUser },
      {
        onSuccess: () => {
          setSelectedUser([]);
          toggleShowOptions();
          setSearchText('');
        }
      }
    );
  };

  return (
    <>
      <Layout.Flex>
        <Box className="w-100">
          <Box className="d-flex justify-content-between align-items-center px-3">
            <Text variant="h5" typeface="semiBold" className="py-3" color={base.primary}>
              Assigned Users
            </Text>
            {selectedUser.length > 0 && (
              <LoadingButton
                className="btn btn-sm btn-primary"
                loading={isLoading}
                onClick={handleAssignUserToRole}>
                Assign
              </LoadingButton>
            )}
          </Box>
        </Box>
        {/* <Box className="divider"></Box> */}
        <Box className="position-relative flex-grow-1 w-100">
          <Layout.Absolute scrollable>
            <RoleSpecificUser
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              toggleShowOptions={toggleShowOptions}
              roleId={Number(roleId)}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </Layout.Absolute>
        </Box>
      </Layout.Flex>
    </>
  );
}

export default UserList;
