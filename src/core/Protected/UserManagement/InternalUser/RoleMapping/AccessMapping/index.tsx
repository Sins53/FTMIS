import { Box, FlexBox, Text } from '@/components/core';
import { Switch } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { base, coolGray } from '@/theme/colors';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Privilege, UserPrivilegeRequestData } from '../UserScreen/schema';
import { usePrivilegeByUserIdMenuIdData } from './accessMappingQueries';
import { usePrivilegeListData } from '@/core/Protected/RoleManagement/RoleAccessMapping/RoleScreen/roleScreenQueries';
import { useUserPrivilegeCreator } from '../UserScreen/userScreenQueries';
import Layout from '@/components/layout';
import SuccessModal from '@/components/Modal/SuccessModal';
import { useTranslation } from 'react-i18next';

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
  userId: number;
  menuId: number;
  showPrivilege: boolean;
}

function AccessMapping(props: AccessMappingInterface): JSX.Element {
  const { userId, menuId, showPrivilege } = props;
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const toggleSuccessModal = () => setModalSuccess(!modalSuccess);
  const { t } = useTranslation();

  const [privilegeIds, setPrivilegeIds] = useState<number[]>([]);

  const { data: privilegeListData } = usePrivilegeListData();

  const { mutate: privilegeCreatorMutate } = useUserPrivilegeCreator();

  const {
    data: privilateList,
    isSuccess: privilateListFetched,
    refetch: privilegeRefetch
  } = usePrivilegeByUserIdMenuIdData(userId, menuId);

  const handleChangePrivilege = (id: number) => {
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
    const requestData: UserPrivilegeRequestData = {
      menu: menuId,
      privilege: privilegeIds,
      user: userId
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
    if (userId && menuId) {
      privilegeRefetch();
    }
  }, [userId, menuId]);

  return (
    <>
      <Layout.Flex>
        <FlexBox align="center" justify="space-between" className="p-3 w-100">
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
            <FlexBox justify="flex-end" className="p-3 w-100">
              <Button className="btn btn-success" type="submit" onClick={handlePrivilegeUpdate}>
                Update
              </Button>
            </FlexBox>
          </>
        )}
      </Layout.Flex>
      <SuccessModal
        modalSuccess={modalSuccess}
        toggleSuccessModal={toggleSuccessModal}
        title={t('common:header.successful')}
        message={t('common:header.data_saved')}
        buttonText={t('common:buttons.ok')}
      />
    </>
  );
}

export default AccessMapping;
