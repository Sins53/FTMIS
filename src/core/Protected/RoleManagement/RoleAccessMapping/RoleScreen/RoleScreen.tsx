import { Box, FlexBox, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import Layout from '@/components/layout';
import DeleteModal from '@/components/Modal/DeleteModal';
import { base } from '@/theme/colors';
import React, { useState } from 'react';
import RoleScreenForm from './RoleScreenForm';
import { useDeleteScreenByRoleIdMenuId, useScreenListByRoleIdData } from './roleScreenQueries';
import { Menu, MenuIdRoleIdParams } from './schema';

interface RoleScreenInterface {
  setMenuId: (id: number) => void;
  setShowPrivilege: (showPrivilege: boolean) => void;
  roleId: number;
}

function RoleScreen(props: RoleScreenInterface) {
  const { setMenuId, setShowPrivilege, roleId } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | undefined>();

  const [modalDelete, setModalDelete] = useState(false);
  const toggleDeleteModal = () => setModalDelete(!modalDelete);
  const [deleteParams, setDeleteParams] = useState<MenuIdRoleIdParams>({} as MenuIdRoleIdParams);

  // const permissionGate = useModulePermissionGate(PRIVILEGESCREEN.ROLE, PRIVILEGEMODULE.ROLES);

  const toggle = () => setIsOpen(!isOpen);

  const {
    data: screenByRoleData
    // isLoading: screenByRoleDataLoading,
    // isSuccess: screenByRoleDataFetched
  } = useScreenListByRoleIdData(`${roleId}`);

  const { mutate: deleteScreenMutate } = useDeleteScreenByRoleIdMenuId();

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
        <FlexBox align="center" justify="space-between" className="py-3 w-100 px-4">
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
              {screenByRoleData?.data?.menus?.map((data: Menu) => (
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
                          setDeleteParams({ roleId: roleId, menuId: data.menu_id });
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
      <RoleScreenForm toggle={toggle} isOpen={isOpen} setIsOpen={setIsOpen} roleId={roleId} />
      <DeleteModal
        handleDeleteClick={handleScreenDelete}
        toggleDeleteModal={toggleDeleteModal}
        modalDelete={modalDelete}
      />
    </>
  );
}

export default RoleScreen;
