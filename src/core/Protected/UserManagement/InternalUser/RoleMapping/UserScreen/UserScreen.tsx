import { Box, FlexBox, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import DeleteModal from '@/components/Modal/DeleteModal';
import { base } from '@/theme/colors';
import React, { useState } from 'react';
import UserScreenForm from './UserScreenForm';
import { MenuData, MenuIdUserIdParams } from './schema';
import { useDeleteScreenByUserIdMenuId } from './userScreenQueries';
import Layout from '@/components/layout';

interface UserScreenInterface {
  setMenuId: (id: number) => void;
  setShowPrivilege: (showPrivilege: boolean) => void;
  menuList: MenuData[];
  userId: number;
}

function UserScreen(props: UserScreenInterface) {
  const { setMenuId, setShowPrivilege, menuList, userId } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | undefined>();

  const [modalDelete, setModalDelete] = useState(false);
  const toggleDeleteModal = () => setModalDelete(!modalDelete);
  const [deleteParams, setDeleteParams] = useState<MenuIdUserIdParams>({} as MenuIdUserIdParams);

  // const permissionGate = useModulePermissionGate(PRIVILEGESCREEN.ROLE, PRIVILEGEMODULE.ROLES);

  const toggle = () => setIsOpen(!isOpen);

  const { mutate: deleteScreenMutate } = useDeleteScreenByUserIdMenuId();

  const handleScreenDelete = () => {
    deleteScreenMutate(deleteParams, {
      onSuccess: () => {
        setShowPrivilege(false);
      }
    });
  };

  return (
    <>
      <Layout.Flex>
        <FlexBox align="center" justify="space-between" className="py-3 px-4 w-100">
          <Text variant="h5" typeface="semiBold" color={base.primary}>
            Screen
          </Text>
          <Button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setIsOpen(!isOpen);
            }}>
            <i className="ic-add"></i>
          </Button>
        </FlexBox>
        <Box className="divider w-100"></Box>
        <Box className="position-relative w-100 flex-grow-1">
          <Layout.Absolute scrollable>
            <Box component="ul" className="list list-02">
              {menuList?.map((data: MenuData) => (
                <div
                  key={data.menu_id}
                  onClick={() => {
                    setShowPrivilege(true);
                    setMenuId(data.menu_id);
                    setActiveId(data.menu_id);
                  }}>
                  <Box
                    component="li"
                    className={activeId == data.menu_id ? 'active to-hover' : 'to-hover'}>
                    <Text variant="p" className="text-truncate">
                      {data?.menu_name}
                    </Text>
                    <div className="to-show">
                      <button
                        className="btn btn-danger btn-xs"
                        onClick={() => {
                          setDeleteParams({ userId: userId, menuId: data.menu_id });
                          toggleDeleteModal();
                        }}>
                        <i className="ic-close"></i>
                      </button>
                    </div>
                  </Box>
                </div>
              ))}
            </Box>
          </Layout.Absolute>
        </Box>
      </Layout.Flex>
      <UserScreenForm toggle={toggle} isOpen={isOpen} setIsOpen={setIsOpen} userId={userId} />
      <DeleteModal
        handleDeleteClick={handleScreenDelete}
        toggleDeleteModal={toggleDeleteModal}
        modalDelete={modalDelete}
      />
    </>
  );
}

export default UserScreen;
