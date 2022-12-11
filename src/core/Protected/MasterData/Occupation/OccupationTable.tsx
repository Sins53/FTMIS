import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { useDebounce } from '@/hooks';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';

import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { useOccupationData, useOccupationDelete } from './occupationQueries';
import { OccupationResponseData, RequestData } from './occupationSchema';
interface OccupationTableProps {
  toggle?: () => void;
  setFormData: Dispatch<SetStateAction<RequestData>>;
}

function OccupationTable(props: OccupationTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const { data: occupationData, isLoading: occupationLoading } = useOccupationData({
    page_size: rowPerPage,
    page: currentPage + 1,
    sort: 'asc',
    search: debouncedValue
  });

  const { toggle, setFormData } = props;
  const { t } = useTranslation();
  const { mutate } = useOccupationDelete();
  const permissionGate = usePermissionGate(SCREEN_CODE.OCCUPATION);

  const columns = useMemo(() => {
    const column = [
      {
        Header: t('common:table.occupation'),
        accessor: 'name',
        Cell: ({ row }: Cell<OccupationResponseData>) => {
          const { name } = row.original;
          return name || '';
        }
      },

      ...(permissionGate.can_update || permissionGate.can_delete
        ? [
            {
              Header: t('common:table.action'),
              Cell: ({ row }: Cell<OccupationResponseData>) => {
                const { id, name } = row.original;

                return (
                  <TableAction
                    handleDeleteClick={
                      permissionGate.can_delete
                        ? () => {
                            if (id) {
                              occupationData?.records.length == 1 &&
                                currentPage > 0 &&
                                setCurrentPage(currentPage - 1);
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
  }, [permissionGate.can_delete, permissionGate.can_update, t, occupationData]);

  return (
    <Table
      data={occupationData?.records || []}
      columns={columns}
      isSearch
      loading={occupationLoading}
      serverPagination
      serverPaginationParams={{
        currentPage,
        rowPerPage,
        totalItem: occupationData?.totalRecords || 0,
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

export default OccupationTable;
