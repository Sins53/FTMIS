import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Cell } from 'react-table';
import { RequestData, DesignationResponseData } from './selfEmploymentSchema';
import { useSelfEmploymentDelete, useSelfEmploymentData } from './selfEmploymentQueries';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
interface SelfEmploymentTableProps {
  toggle?: () => void;
  setFormData: Dispatch<SetStateAction<RequestData>>;
}

function SelfEmploymentTable(props: SelfEmploymentTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const { data: loanTypeData, isLoading: loanTypeLoading } = useSelfEmploymentData({
    page_size: rowPerPage,
    page: currentPage + 1,
    sort: 'asc',
    search: debouncedValue
  });

  const permissionGate = usePermissionGate(SCREEN_CODE.SELF_EMPLOYMENT);
  const { toggle, setFormData } = props;

  const { mutate } = useSelfEmploymentDelete();

  const columns = useMemo(() => {
    const column = [
      {
        Header: t('common:table.name'),
        accessor: 'name',
        Cell: ({ row }: Cell<DesignationResponseData>) => {
          return row.original.name || '';
        }
      },
      ...(permissionGate.can_update || permissionGate.can_delete
        ? [
            {
              Header: t('common:table.action'),
              Cell: ({ row }: Cell<DesignationResponseData>) => {
                const { id, name } = row.original;

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
                              name: name
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

export default SelfEmploymentTable;
