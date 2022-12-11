import { Box, FlexBox, Text } from '@/components/core';
import { Switch } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import Layout from '@/components/layout';
import SuccessModal from '@/components/Modal/SuccessModal';
import { base, coolGray } from '@/theme/colors';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePrivilegeCreator, usePrivilegeListData } from '../RoleScreen/roleScreenQueries';
import { Privilege, RolePrivilegeRequestData } from '../RoleScreen/schema';
import { usePrivilegeByRoleIdMenuIdData } from './accessMappingQueries';

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.25rem;
  &:hover {
    background-color: #e9ecef;
  }
`;

interface AccessMappingInterface {
  roleId: number;
  menuId: number;
  showPrivilege: boolean;
}

function AccessMapping(props: AccessMappingInterface): JSX.Element {
  const { roleId, menuId, showPrivilege } = props;
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const toggleSuccessModal = () => setModalSuccess(!modalSuccess);

  const [privilegeIds, setPrivilegeIds] = useState<number[]>([]);

  const { data: privilegeListData } = usePrivilegeListData();

  const { mutate: privilegeCreatorMutate } = usePrivilegeCreator();

  const {
    data: privilateList,
    isSuccess: privilateListFetched,
    refetch: privilegeRefetch
  } = usePrivilegeByRoleIdMenuIdData(roleId, menuId);

  const handleChangePrivilege = (id: number) => {
    console.log(id, 'id');
    let ids = privilegeIds;
    if (ids?.includes(id)) {
      ids = ids?.filter((value: number) => value != id);
    } else {
      ids = [...ids, id];
    }
    setPrivilegeIds(ids);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = privilegeListData?.data?.records?.map((data: Privilege) => data?.id) || [];
      setPrivilegeIds(allIds);
    } else {
      setPrivilegeIds([]);
    }
  };

  const handlePrivilegeUpdate = () => {
    const requestData: RolePrivilegeRequestData = {
      menu: menuId,
      privilege: privilegeIds,
      role: roleId
    };
    privilegeCreatorMutate(requestData, {
      onSuccess: () => {
        toggleSuccessModal();
      }
    });
  };

  useEffect(() => {
    if (privilateListFetched && privilateList) {
      if (privilateList?.data?.privilege) {
        setPrivilegeIds(privilateList?.data?.privilege);
      }
    }
  }, [privilateList, privilateListFetched]);

  useEffect(() => {
    if (roleId && menuId) {
      privilegeRefetch();
    }
  }, [roleId, menuId]);

  return (
    <>
      <Layout.Flex>
        <FlexBox align="center" justify="space-between" className="w-100 p-3">
          <Text variant="h5" typeface="semiBold" color={base.primary}>
            Privileges
          </Text>
          {showPrivilege && (
            <FlexBox align="center">
              <Text color={coolGray[900]} className="mr-2">
                Select All
              </Text>
              <Switch
                checked={
                  privilegeListData?.data?.records.length === privilegeIds.length ? true : false
                }
                onChange={(e) => handleSelectAll(e.currentTarget.checked)}
              />
            </FlexBox>
          )}
        </FlexBox>
        <Box className="divider w-100"></Box>
        {showPrivilege && (
          <>
            <Box className="position-relative flex-grow-1 w-100">
              <Layout.Absolute scrollable>
                <Box component="ul" className="list w-100">
                  {privilegeListData?.data?.records?.map((data: Privilege) => (
                    <StyledItem key={data.id}>
                      <Text variant="p" typeface="semiBold" color={coolGray[600]}>
                        Allow user to
                        <span className="font-bold"> {data.name}</span>
                      </Text>
                      <Switch
                        onChange={() => handleChangePrivilege(data.id)}
                        checked={privilegeIds?.includes(data.id) ? true : false}
                        label=""
                      />
                    </StyledItem>
                  ))}
                </Box>
              </Layout.Absolute>
            </Box>
            <Box className="text-end w-100 p-3">
              <Button className="btn btn-success" type="submit" onClick={handlePrivilegeUpdate}>
                Update
              </Button>
            </Box>
          </>
        )}
      </Layout.Flex>
      <SuccessModal
        modalSuccess={modalSuccess}
        toggleSuccessModal={toggleSuccessModal}
        title="Successful"
        message="Data has been saved successfully."
        buttonText="OK"
      />
    </>
  );
}

export default AccessMapping;
