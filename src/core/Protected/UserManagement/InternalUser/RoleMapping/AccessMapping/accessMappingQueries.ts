import { apiList } from '@/store/apiDetails';
import performApiAction from '@/helper/default-action';

import { useQuery } from 'react-query';
import { ScreenByRoleIdMenuIdResponse } from '../UserScreen/schema';

const { getPrivilageByMenuIdUserId } = apiList.userManagement.UserAccessMapping;

export const usePrivilegeByUserIdMenuIdData = (userId: number | string, menuId: number | string) =>
  useQuery(
    [getPrivilageByMenuIdUserId.queryKeyName, userId],
    () =>
      performApiAction<ScreenByRoleIdMenuIdResponse>(getPrivilageByMenuIdUserId, {
        pathVariables: { userId: userId, menuId: menuId }
      }),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true,
      enabled: false
    }
  );
