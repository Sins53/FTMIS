import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';

import { useDebounce } from '@/hooks';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { useBranchesData, useBranchImport, useDeleteBranch } from './branchQueries';
import { BranchData, branchInitialValueProp } from './schema';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { Switch } from '@/components/core/FormElement';
import { getTextByLanguage } from '@/i18n/i18n';
interface BranchTableProps {
  toggle?: () => void;
  setFormData: Dispatch<SetStateAction<branchInitialValueProp>>;
}
function BranchTable(props: BranchTableProps) {
  const { toggle, setFormData } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const permissionGate = usePermissionGate(SCREEN_CODE.BRANCH_SETUP);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const { t } = useTranslation();

  const { data: branchData, isLoading: branchLoading } = useBranchesData({
    page: currentPage + 1,
    page_size: rowPerPage,
    search: debouncedValue,
    view: 'admin'
  });

  const { mutate } = useDeleteBranch();

  const [importFile, setImportFile] = useState<File>();
  const { mutate: mutateImport, isLoading: importLoading } = useBranchImport();

  const handleImport = (file: File) => {
    mutateImport({ file });
  };

  //
  const columns = useMemo(() => {
    const column = [
      {
        Header: t('common:table.nameEn'),
        accessor: 'name_en',
        Cell: ({ row }: Cell<BranchData>) => {
          return row.original.name_en || '';
        }
      },

      {
        Header: t('common:table.nameNp'),
        accessor: 'name_np',

        Cell: ({ row }: Cell<BranchData>) => {
          return row.original.name_np || '';
        }
      },
      {
        Header: t('common:table.branchCode'),
        accessor: 'branch_code',

        Cell: ({ row }: Cell<BranchData>) => {
          return row.original.branch_code || '';
        }
      },
      {
        Header: t('fields:province.label'),
        accessor: 'province',

        Cell: ({ row }: Cell<BranchData>) => {
          return (
            (row.original.province?.name_en &&
              getTextByLanguage(row.original.province?.name_en, row.original.province?.name_np)) ||
            ''
          );
        }
      },
      {
        Header: t('common:table.address'),
        accessor: 'address',

        Cell: ({ row }: Cell<BranchData>) => {
          return row.original.address || '';
        }
      },
      {
        Header: t('common:table.status'),
        Cell: ({ row }: Cell<any>) => {
          const { id, is_deleted } = row.original;
          return (
            (
              <Switch
                checked={!is_deleted}
                label={is_deleted ? 'Deactivated' : 'Active'}
                onClick={permissionGate.can_delete ? () => id && mutate(id) : undefined}
              />
            ) || ''
          );
        }
      },
      ...(permissionGate.can_update
        ? [
            {
              Header: t('common:table.action'),
              Cell: ({ row }: Cell<BranchData>) => {
                const {
                  id,
                  name_en,
                  name_np,
                  branch_code,
                  province,
                  address,
                  is_head_office,
                  is_province_office
                } = row.original;

                return (
                  <TableAction
                    handleEditClick={
                      permissionGate.can_update
                        ? () => {
                            toggle && toggle();
                            setFormData({
                              id,
                              name_en,
                              name_np,
                              branch_code,
                              province: province?.id,
                              address,
                              is_head_office,
                              is_province_office
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
  }, [permissionGate.can_update, permissionGate.can_delete, t]);

  useEffect(() => {
    if (importFile) {
      handleImport(importFile);
    }
  }, [importFile]);

  return (
    <Table
      data={branchData?.data.records || []}
      columns={columns}
      isSearch
      loading={branchLoading}
      serverPagination
      serverPaginationParams={{
        currentPage,
        rowPerPage,
        totalItem: branchData?.data.totalRecords || 0,
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
      importExportLoading={importLoading}
      importExportProps={{
        handleImportCSV: setImportFile
      }}
    />
  );
}

export default BranchTable;
