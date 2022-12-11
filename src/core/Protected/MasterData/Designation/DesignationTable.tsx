import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Cell } from 'react-table';
import { RequestData, DesignationResponseData } from './designationSchema';
import { useDesignationDelete, useDesignationData } from './designationQueries';

import { useTranslation } from 'react-i18next';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
interface LoanTypeTableProps {
  toggle?: () => void;
  setFormData: Dispatch<SetStateAction<RequestData>>;
}

function LoanTypeTable(props: LoanTypeTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const { t } = useTranslation();
  const { data: loanTypeData, isLoading: loanTypeLoading } = useDesignationData({
    page_size: rowPerPage,
    page: currentPage + 1,
    sort: 'asc',
    search: debouncedValue
  });
  const permissionGate = usePermissionGate(SCREEN_CODE.DESIGNATION);

  const { toggle, setFormData } = props;

  const { mutate } = useDesignationDelete();

  const columns = useMemo(() => {
    const column = [
      {
        Header: t('common:table.nameEn'),
        accessor: 'name_en',
        Cell: ({ row }: Cell<RequestData>) => {
          return row.original?.name_en || '';
        }
      },
      {
        Header: t('common:table.nameNp'),
        accessor: 'name_np',
        Cell: ({ row }: Cell<RequestData>) => {
          return row.original?.name_np || '';
        }
      },
      ...(permissionGate.can_update || permissionGate.can_delete
        ? [
            {
              Header: t('common:table.action'),
              Cell: ({ row }: Cell<DesignationResponseData>) => {
                const { id, name_en, name_np } = row.original;

                return (
                  <TableAction
                    handleDeleteClick={
                      permissionGate.can_delete
                        ? () => {
                            if (id) {
                              mutate(id);
                            }
                          }
                        : undefined
                    }
                    handleEditClick={
                      permissionGate.can_update
                        ? () => {
                            toggle && toggle();
                            setFormData({
                              id,
                              name_en,
                              name_np
                            });
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

    return column;
  }, [permissionGate.can_delete, permissionGate.can_update, t]);

  return (
    <Table
      data={loanTypeData?.records || []}
      columns={columns}
      isSearch
      loading={loanTypeLoading}
      serverPagination
      serverPaginationParams={{
        currentPage,
        rowPerPage,
        totalItem: loanTypeData?.totalRecords || 0,
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
  );
}

export default LoanTypeTable;
