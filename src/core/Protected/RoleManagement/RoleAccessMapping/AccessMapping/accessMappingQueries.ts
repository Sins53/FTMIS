import { apiList } from '@/store/apiDetails';
import performApiAction from '@/helper/default-action';

import { useQuery } from 'react-query';
import { ScreenByRoleIdMenuIdResponse } from '../RoleScreen/schema';

const { getPrivilageByMenuIdRoleId } = apiList.roleManagement.roleAccessMapping;

export const usePrivilegeByRoleIdMenuIdData = (roleId: number | string, menuId: number | string) =>
  useQuery(
    [getPrivilageByMenuIdRoleId.queryKeyName, roleId],
    () =>
      performApiAction<ScreenByRoleIdMenuIdResponse>(getPrivilageByMenuIdRoleId, {
        pathVariables: { roleId: roleId, menuId: menuId }
      }),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true,
      enabled: false
    }
  );
