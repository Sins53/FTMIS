import { Switch } from '@/components/core/FormElement';
import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { useDebounce } from '@/hooks';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import {
  useDeleteFiscalYear,
  useFiscalYearData,
  useToggleFiscalYearStatus
} from './fiscalYearQueries';

interface FiscalYearTableProps {
  toggle?: () => void;
  setFormData: any;
}

const FiscalYearTable = (props: FiscalYearTableProps) => {
  const permissionGate = usePermissionGate(SCREEN_CODE.FISCAL_YEAR);
  const { toggle, setFormData } = props;
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const { data: fiscalYearData, isLoading: fiscalYearDataLoading } = useFiscalYearData({
    page_size: rowPerPage,
    page: currentPage + 1,
    search: debouncedValue
  });
  const { mutate } = useDeleteFiscalYear();
  const { mutate: toggleStatus } = useToggleFiscalYearStatus();

  const columns = useMemo(() => {
    const column = [
      {
        Header: t('common:table.fiscal_year'),
        Cell: ({ row }: Cell<any>) => {
          return row.original.name || '';
        }
      },
      {
        Header: t('common:table.status'),
        Cell: ({ row }: Cell<any>) => {
          const { id, is_active } = row.original;
          return (
            (
              <Switch
                checked={is_active}
                label={is_active ? 'Active' : 'Deactivated'}
                onClick={
                  permissionGate.can_update
                    ? () => id && toggleStatus({ id, is_active: !is_active })
                    : undefined
                }
              />
            ) || ''
          );
        }
      },
      ...(permissionGate.can_update || permissionGate.can_delete
        ? [
            {
              Header: t('common:table.action'),
              Cell: ({ row }: Cell<any>) => {
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
    <>
      <Table
        data={fiscalYearData?.records || []}
        columns={columns}
        isSearch
        isServerSearch
        serverSearchText={searchValue}
        setServerSearchText={setSearchValue}
        loading={fiscalYearDataLoading}
        serverPagination
        serverPaginationParams={{
          currentPage,
          rowPerPage,
          totalItem: fiscalYearData?.totalRecords || 0,
          gotoPage: (num: number) => {
            setCurrentPage(num);
          },
          getRow: (number: number) => {
            setRowPerPage(number);
          }
        }}
      />
    </>
  );
};

export default FiscalYearTable;
