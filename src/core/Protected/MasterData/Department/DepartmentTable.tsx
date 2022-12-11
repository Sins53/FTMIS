import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Cell } from 'react-table';
import { DepartmentRequestData, DepartmentResponseData } from './schema';
import { useDeleteLoanType, useDepartmentData, useFilterByDepartmentId } from './departmentQueries';
import { SCREEN_CODE } from '@/routes/props';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { OptionType } from '@/components/StyledSelect/StyledSelect';
import { getLanguageLabelValueArray } from '@/utils/selectHelper';
import { useTranslation } from 'react-i18next';

interface LoanTypeTableProps {
  toggle?: () => void;
  isEdit: boolean;
  setFormData: Dispatch<SetStateAction<DepartmentRequestData>>;
  setParentDepartmentOption: React.Dispatch<React.SetStateAction<OptionType[] | undefined>>;
}

function DepartmentTable(props: LoanTypeTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const permissionGate = usePermissionGate(SCREEN_CODE.DEPARTMENT);

  const { data: departmentData, isLoading: departmentDataLoading } = useDepartmentData({
    page: currentPage + 1,
    page_size: rowPerPage,
    search: debouncedValue
  });
  const { data: provinceFilterOption } = useFilterByDepartmentId(editId ?? null);
  const { toggle, setFormData, setParentDepartmentOption, isEdit } = props;

  useEffect(() => {
    isEdit &&
      setParentDepartmentOption(getLanguageLabelValueArray(provinceFilterOption?.data ?? []));
  }, [provinceFilterOption, t, isEdit]);

  const { mutate } = useDeleteLoanType();

  const columns = useMemo(() => {
    const column = [
      {
        Header: t('common:table.nameEn'),
        accessor: 'name_en',
        Cell: ({ row }: Cell<DepartmentResponseData>) => {
          return row.original.name_en || '';
        }
      },
      {
        Header: t('common:table.nameNp'),
        accessor: 'name_np',
        Cell: ({ row }: Cell<DepartmentResponseData>) => {
          return row.original.name_np || '';
        }
      },
      {
        Header: t('common:table.parent_department_en'),
        accessor: 'parent_department',
        Cell: ({ row }: Cell<DepartmentResponseData>) => {
          return row.original.parent_department_name_en || '';
          // return getTextByLanguage() row.original.parent_department || '';
        }
      },
      {
        Header: t('common:table.parent_department_np'),
        accessor: 'parent_department_np',
        Cell: ({ row }: Cell<DepartmentResponseData>) => {
          return row.original.parent_department_name_np || '';
        }
      },
      {
        Header: t('common:table.parent_type'),
        accessor: 'parent_type',
        Cell: ({ row }: Cell<DepartmentResponseData>) => {
          return row.original.parent_type?.name || '';
        }
      },
      ...(permissionGate.can_update || permissionGate.can_delete
        ? [
            {
              Header: t('common:table.action'),
              Cell: ({ row }: Cell<DepartmentResponseData>) => {
                const { id, name_en, name_np, parent_department, parent_type } = row.original;
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
                            setEditId(id ?? null);
                            provinceFilterOption &&
                              setParentDepartmentOption(
                                getLanguageLabelValueArray(provinceFilterOption?.data ?? [])
                              );
                            toggle && toggle();
                            setFormData({
                              id,
                              name_en,
                              name_np,
                              parent_department,
                              parent_type: parent_type?.id ? Number(parent_type.id) : null
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
      data={departmentData?.records || []}
      columns={columns}
      isSearch
      loading={departmentDataLoading}
      serverPagination
      serverPaginationParams={{
        currentPage,
        rowPerPage,
        totalItem: departmentData?.totalRecords || 0,
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

export default DepartmentTable;
