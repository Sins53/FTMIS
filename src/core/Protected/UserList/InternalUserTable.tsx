import { Box, FlexBox, Image, Text } from '@/components/core';
import { Switch } from '@/components/core/FormElement';
import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { userManagementPath } from '@/routes/protected/userManagement';
import { sanitizeURL } from '@/shared/utils';
import { generateFileUrl } from '@/utils';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'react-table';
import {
  useDeleteInternalUser,
  useResetInternalUserPasswordData
} from '../UserManagement/InternalUser/internalUserQueries';
import { useInternalUserData } from './userListQueris';
import profileImage from '@/assets/image/user.jpg';
import { useTranslation } from 'react-i18next';
import { encodeData } from '@/utils/utilsFunction/encode-decode';
import { InternalUserData } from './userListSchema';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { getTextByLanguage } from '@/i18n/i18n';
import { ImKey } from 'react-icons/im';
import { gray } from '@/theme/colors';
import ConfirmationModal from '@/components/Modal/ConfirmationModal';
import SuccessModal from '@/components/Modal/SuccessModal';

function InternalUserTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const [userId, setUserId] = useState<number | string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const [resetPasswordModal, setResetPasswordModal] = useState<boolean>(false);
  const toggleResetPasswordModal = () => setResetPasswordModal(!resetPasswordModal);

  const [successModal, setSuccessModal] = useState<boolean>(false);
  const toggleSuccessModal = () => setSuccessModal(!successModal);

  const { data: internalUserData, isLoading: internalUserLoading } = useInternalUserData({
    page: currentPage + 1,
    page_size: rowPerPage,
    search: debouncedValue
  });
  const navigate = useNavigate();
  const permissionGate = usePermissionGate(SCREEN_CODE.USERS);

  const { mutate } = useDeleteInternalUser();
  const { mutate: mutateRestePassword } = useResetInternalUserPasswordData();
  const columns = [
    {
      Header: t('fields:first_name.label'),
      Cell: ({ row }: Cell<InternalUserData>) => {
        return (
          <FlexBox align="center">
            <Image
              src={
                row?.original?.picture
                  ? generateFileUrl(row.original.picture as string)
                  : profileImage
              }
              height="42"
              width="42"
              className="rounded-circle"></Image>
            <Box className="ml-2">
              <Text typeface="semiBold" className="mb-1">
                <span className="mr-1">{row.original.first_name || ''}</span>
                <span className="mr-1">{row.original.middle_name || ''}</span>
                {row.original.last_name || ''}
              </Text>
              <Text variant="display1">{row.original.employee_id || ''}</Text>
            </Box>
          </FlexBox>
        );
      }
    },

    {
      Header: t('fields:branch.label'),
      Cell: ({ row }: Cell<InternalUserData>) => {
        return (
          (row.original.branch_name_en &&
            getTextByLanguage(row.original.branch_name_en, row.original.branch_name_np)) ||
          ''
        );
      }
    },
    {
      Header: t('common:header.department'),
      Cell: ({ row }: Cell<InternalUserData>) => {
        return (
          (row.original.department_title_en &&
            getTextByLanguage(
              row.original.department_title_en,
              row.original.department_title_np
            )) ||
          ''
        );
      }
    },
    {
      Header: t('fields:province.label'),
      Cell: ({ row }: Cell<InternalUserData>) => {
        return (
          (row.original.province_name_en &&
            getTextByLanguage(row.original.province_name_en, row.original.province_name_np)) ||
          ''
        );
      }
    },
    {
      Header: t('common:table.status'),
      Cell: ({ row }: Cell<InternalUserData>) => {
        const { user } = row.original;
        return (
          (
            <Switch
              checked={row.original.is_active}
              onClick={permissionGate.can_update ? () => user && mutate(user) : undefined}
            />
          ) || ''
        );
      }
    },
    ...(permissionGate.can_update || permissionGate.can_configure
      ? [
          {
            Header: t('common:table.action'),
            Cell: ({ row }: Cell<InternalUserData>) => {
              const { user, id, is_active } = row.original;
              const editUrl = () =>
                sanitizeURL(userManagementPath.editInternalUser, {
                  id: user as number
                });
              const configUrl = () =>
                sanitizeURL(userManagementPath.internalUserRoleMapping, {
                  id: encodeData(id + '')
                });
              return (
                <FlexBox align="center">
                  {is_active && permissionGate.can_configure && (
                    <span
                      onClick={() => {
                        setUserId(id);
                        toggleResetPasswordModal();
                      }}
                      role="button"
                      title={'Password Reset'}
                      className="mr-3">
                      <ImKey size="16" color={gray[400]} />
                    </span>
                  )}
                  <TableAction
                    handleEditClick={
                      permissionGate.can_update
                        ? () => {
                            navigate(editUrl());
                          }
                        : undefined
                    }
                    handleConfigurationClick={
                      permissionGate.can_configure
                        ? is_active
                          ? () => {
                              navigate(configUrl());
                            }
                          : undefined
                        : undefined
                    }
                    disable={{ config: !is_active }}
                  />
                </FlexBox>
              );
            }
          }
        ]
      : [])
  ];

  const handleResetPassword = () => {
    mutateRestePassword(userId, {
      onSuccess: () => {
        toggleSuccessModal();
      }
    });
  };

  return (
    <>
      <Table
        data={internalUserData?.data?.records || []}
        columns={columns}
        isSearch
        loading={internalUserLoading}
        serverPagination
        serverPaginationParams={{
          currentPage,
          rowPerPage,
          totalItem: internalUserData?.data.totalRecords || 0,
          gotoPage: (num: number) => {
            setCurrentPage(num);
          },
          getRow: (number: number) => {
            setRowPerPage(number);
          }
        }}
        isServerSearch
        serverSearchText={searchValue}
        setServerSearchText={setSearchValue}
      />
      <ConfirmationModal
        isModalOpen={resetPasswordModal}
        toggleModal={toggleResetPasswordModal}
        handleModalAction={handleResetPassword}
        confirmationMessage={getTextByLanguage(
          'Are you sure want to reset password of this user?',
          'के तपाइँ यो प्रयोगकर्ताको पासवर्ड रिसेट गर्न निश्चित हुनुहुन्छ?'
        )}
        actionButtonName={t('common:buttons.yes')}
      />
      <SuccessModal
        modalSuccess={successModal}
        toggleSuccessModal={toggleSuccessModal}
        title={getTextByLanguage('Reset Successful', 'रिसेट सफल भयो')}
        message={getTextByLanguage(
          'Password has been reset successfully. New password has been sent to the email of the user.',
          'पासवर्ड सफलतापूर्वक रिसेट गरिएको छ। नयाँ पासवर्ड प्रयोगकर्ताको इमेलमा पठाइएको छ।'
        )}
        buttonText={t('common:buttons.ok')}
      />
    </>
  );
}

export default InternalUserTable;
