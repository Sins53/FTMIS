import { Switch } from '@/components/core/FormElement';
import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { useDebounce } from '@/hooks';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { roleManagementPath } from '@/routes/role-management';
import { sanitizeURL } from '@/shared/utils';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { encodeData } from '@/utils/utilsFunction/encode-decode';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'react-table';
import { useRoleCreator, useRoleData } from './roleQueries';
import { RoleData, roleFormProps } from './schema';

interface RoleTableProps {
  toggle?: () => void;
  setFormData: React.Dispatch<React.SetStateAction<roleFormProps>>;
}
function RoleTable(props: RoleTableProps) {
  const permissionGate = usePermissionGate(SCREEN_CODE.ROLES);
  const { toggle, setFormData } = props;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const { data: roleData, isLoading: roleLoading } = useRoleData({
    page_size: rowPerPage,
    page: currentPage + 1,
    search: debouncedValue
  });
  const { mutate: roleEditMutute } = useRoleCreator(true);

  const columns = useMemo(
    () => [
      { Header: 'Role ', accessor: 'name' },
      { Header: 'Code', accessor: 'code' },
      {
        Header: 'Status',
        Cell: ({ row }: { row: { [key: string]: any } }) => {
          const { original } = row;
          return (
            <Switch
              onChange={
                permissionGate.can_update
                  ? () => {
                      roleEditMutute({
                        id: original.id,
                        name: original.name,
                        code: original.code,
                        is_active: !original.is_active
                      });
                    }
                  : undefined
              }
              checked={original?.is_active}
              name="is_active"
            />
          );
        }
      },
      ...(permissionGate.can_update || permissionGate.can_configure
        ? [
            {
              Header: 'Action',
              Cell: ({ row }: Cell<RoleData>) => {
                const { id, name, code, is_active } = row.original;
                const configUrl = () =>
                  sanitizeURL(roleManagementPath.roleAccessMapping, {
                    id: encodeData(id + '')
                  });
                return (
                  <TableAction
                    handleEditClick={
                      permissionGate.can_update
                        ? () => {
                            toggle && toggle();
                            setFormData({
                              id,
                              name,
                              code,
                              is_active
                            });
                          }
                        : undefined
                    }
                    handleConfigurationClick={
                      permissionGate.can_configure
                        ? () => {
                            navigate(configUrl());
                          }
                        : undefined
                    }
                    disable={{ config: !is_active }}
                  />
                );
              }
            }
          ]
        : [])
    ],
    [permissionGate.can_configure, permissionGate.can_update]
  );
  return (
    <>
      <Table
        loading={roleLoading}
        data={roleData?.records || []}
        columns={columns}
        isSearch
        serverPagination
        serverPaginationParams={{
          currentPage,
          rowPerPage,
          totalItem: roleData?.totalRecords || 0,
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
    </>
  );
}

export default RoleTable;
