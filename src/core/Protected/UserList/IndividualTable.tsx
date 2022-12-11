import { Box, FlexBox, Image, Text } from '@/components/core';
import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { userManagementPath } from '@/routes/protected/userManagement';
import { sanitizeURL } from '@/shared/utils';
import { generateFileUrl, returnEmptyString } from '@/utils';
//import userLists from '@/store/apiDetails/user-list/user-list';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'react-table';
import { useIndividualCustomerListData, useIndividualUserListCVS } from './userListQueris';
import { IndividualData, InternalUserData } from './userListSchema';
import userImg from '@/assets/image/user.jpg';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { downloadBlob } from '@/utils/fileDownload/fileDownloader';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { SuccessToast } from '@/components/ToastNotifier/ToastNotifier';
function IndividualTable() {
  const permissionGate = usePermissionGate(SCREEN_CODE.CUSTOMER_LIST);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: customerData, isLoading: customerLoading } = useIndividualCustomerListData({
    page: currentPage + 1,
    page_size: rowPerPage,
    search: debouncedValue
  });

  const { mutate: exportFileMutate, isLoading: loadingExport } = useIndividualUserListCVS();

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Individual-User', data.data);
          SuccessToast('Successful');
        }
      }
    });
  };

  const columns = [
    {
      Header: t('fields:full_name.label'),
      Cell: ({ row }: Cell<IndividualData>) => {
        return (
          <FlexBox align="center">
            <Image
              src={
                row?.original?.picture ? generateFileUrl(row.original.picture as string) : userImg
              }
              height="42"
              width="42"
              className="rounded-circle"></Image>
            <Box className="ml-3">
              <Text variant="display1" typeface="semiBold">
                {`${row.original.first_name} ${returnEmptyString(row.original?.middle_name)}
              ${returnEmptyString(row.original?.last_name)}`}
              </Text>
            </Box>
          </FlexBox>
        );
      }
    },

    {
      Header: t('fields:email.label'),
      Cell: ({ row }: Cell<IndividualData>) => {
        return row.original.email || '';
      }
    },
    {
      Header: t('fields:mobile.label'),
      Cell: ({ row }: Cell<IndividualData>) => {
        return row.original.mobile_number || '-';
      }
    },
    {
      Header: t('fields:landline_number.label'),
      Cell: ({ row }: Cell<IndividualData>) => {
        return row.original.landline_number || '-';
      }
    },
    ...(permissionGate.can_read
      ? [
          {
            Header: t('common:table.action'),
            Cell: ({ row }: Cell<InternalUserData>) => {
              return (
                <TableAction
                  handleViewClick={
                    permissionGate.can_read
                      ? () => {
                          navigate(
                            sanitizeURL(userManagementPath.customerDetailView, {
                              id: row.original.id as number
                            })
                          );
                        }
                      : undefined
                  }
                />
              );
            }
          }
        ]
      : [])
  ];

  return (
    <Table
      data={customerData?.data.records || []}
      columns={columns}
      isSearch
      loading={customerLoading}
      serverPagination
      serverPaginationParams={{
        currentPage,
        rowPerPage,
        totalItem: customerData?.data.totalRecords || 0,
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
      isImportExport
      importExportLoading={loadingExport}
      importExportProps={{
        handleExportCSV: exportAsCSV
      }}
    />
  );
}

export default IndividualTable;
