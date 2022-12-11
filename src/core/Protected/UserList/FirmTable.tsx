import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { SuccessToast } from '@/components/ToastNotifier/ToastNotifier';
import { useDebounce } from '@/hooks';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { userManagementPath } from '@/routes/protected/userManagement';
import { sanitizeURL } from '@/shared/utils';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { downloadBlob } from '@/utils/fileDownload/fileDownloader';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'react-table';
import { useFirmCustomerListData, useInstitutionalUserListCVS } from './userListQueris';
import { FirmData } from './userListSchema';
function FirmTable() {
  const permissionGate = usePermissionGate(SCREEN_CODE.CUSTOMER_LIST);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: customerData, isLoading: customerLoading } = useFirmCustomerListData({
    page: currentPage + 1,
    page_size: rowPerPage,
    search: debouncedValue
  });

  const columns = [
    {
      Header: t('fields:firm_name_en.label'),
      Cell: ({ row }: Cell<FirmData>) => {
        return row.original.institution_name || '';
      }
    },

    {
      Header: t('fields:firm_name_np.label'),
      Cell: ({ row }: Cell<FirmData>) => {
        return row.original.institution_name_np || '';
      }
    },
    {
      Header: t('fields:email.label'),
      Cell: ({ row }: Cell<FirmData>) => {
        return row.original.email || '';
      }
    },
    {
      Header: t('fields:mobile.label'),
      Cell: ({ row }: Cell<FirmData>) => {
        return row.original.mobile_number || '';
      }
    },
    ...(permissionGate.can_read
      ? [
          {
            Header: t('common:table.action'),
            Cell: ({ row }: Cell<FirmData>) => {
              console.log(row.original);
              return (
                <TableAction
                  handleViewClick={
                    permissionGate.can_read
                      ? () => {
                          navigate(
                            sanitizeURL(userManagementPath.customerInstitutionDetailView, {
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

  const { mutate: exportFileMutate, isLoading: loadingExport } = useInstitutionalUserListCVS();

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Institutional-User', data.data);
          SuccessToast('Successful');
        }
      }
    });
  };

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

export default FirmTable;
