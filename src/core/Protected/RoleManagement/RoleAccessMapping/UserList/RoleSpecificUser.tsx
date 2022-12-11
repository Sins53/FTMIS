import { FlexBox, Image, Text } from '@/components/core';
import { blue, gray } from '@/theme/colors';
import { generateFileUrl } from '@/utils';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {} from '@/components/StyledSelect/StyledSelect';
import { useRoleDetailByRoleId } from '../../Roles/roleQueries';
import { useRemoveUserInRole, useRoleUnassignedUserData } from './useRoleQuery';
import { RoleUserData } from '../../Roles/schema';
import userImage from '@/assets/image/user.jpg';
import DeleteModal from '@/components/Modal/DeleteModal';
import AssignUserDropdown from '@/core/Protected/RoleManagement/RoleAccessMapping/UserList/AssignUserDropdown';
import { useDebounce } from '@/hooks';

interface Props {
  roleId: number;
  selectedUser: string[];
  setSelectedUser: (option: string[]) => void;
  showOptions: boolean;
  setShowOptions: (showOption: boolean) => void;
  toggleShowOptions: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const Designation = styled(Text)`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  color: ${gray[700]};
  &:before {
    content: ' ';
    display: block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${blue[600]};
  }
`;
export default function RoleSpecificUser(props: Props) {
  const {
    roleId,
    selectedUser,
    setSelectedUser,
    showOptions,
    setShowOptions,
    toggleShowOptions,
    searchText,
    setSearchText
  } = props;

  const [modalDelete, setModalDelete] = useState(false);
  const toggleDeleteModal = () => setModalDelete(!modalDelete);
  const [deleteId, setDeleteId] = useState<number>();

  const debouncedSearchText = useDebounce(searchText, 200);

  const {
    data: userData
    // isLoading: userDataLoading,
    // isSuccess: userDataFetched
  } = useRoleUnassignedUserData(roleId, debouncedSearchText);

  const { data: assignedUserData, refetch: assignedUserRefetech } = useRoleDetailByRoleId(roleId);

  const { mutate: removeUserMutate } = useRemoveUserInRole(roleId);

  const handleRemoveAssignedUser = () => {
    removeUserMutate({ users: [deleteId as number] });
  };

  useEffect(() => {
    assignedUserRefetech();
  }, [roleId]);

  return (
    <>
      <div className="position-relative px-3 pt-3">
        <AssignUserDropdown
          searchText={searchText}
          setSearchText={setSearchText}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          toggleShowOptions={toggleShowOptions}
          userData={userData?.data || []}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
      <ul className="list list-03  scrollable mt-3">
        {assignedUserData?.users?.map((user: RoleUserData) => (
          <li key={user.id}>
            <div className="align-vertical flex-grow-1">
              <Image
                src={user?.picture ? generateFileUrl(user?.picture) : userImage}
                width={'42'}
                height={'42'}
                variant="cover"
                className="rounded-circle"
              />
              <div className="ml-3">
                <h6 className="text-gray-32 fw-bold">{`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}</h6>
                <FlexBox>
                  <p className="text-gray-32">{user?.employee_id}</p>
                  <Designation className="text-gray-32">{user?.designation_title_en}</Designation>
                </FlexBox>
              </div>
            </div>
            <div className="align-vertical">
              <button
                className="btn btn-danger btn-xs"
                onClick={() => {
                  setDeleteId(user.id);
                  toggleDeleteModal();
                }}>
                <i className="ic-close"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <DeleteModal
        handleDeleteClick={handleRemoveAssignedUser}
        toggleDeleteModal={toggleDeleteModal}
        modalDelete={modalDelete}
      />
    </>
  );
}
