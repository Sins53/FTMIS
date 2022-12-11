import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  AllScreenListResponse,
  MenuIdRoleIdParams,
  RolePrivilegeRequestData,
  RoleScreenRequestData,
  ScreenByRoleResponse,
  ScreenListResponse
} from './schema';

const {
  getAllScreenGroupList,
  getAllScreenListForConfig,
  getScreenByRoleId,
  addScreen,
  editPrivilege,
  getAllPrivilegeList,
  deleteScreenByRoleId
} = apiList.roleManagement.screenGroup;

interface ScreenListParams {
  screen: string;
  id: number;
}

export const useScreenListForConfig = (params: ScreenListParams) =>
  useQuery(
    [getAllScreenListForConfig.queryKeyName],
    () =>
      params
        ? performApiAction<AllScreenListResponse>(getAllScreenListForConfig, {
            params: {
              screen: params.screen,
              id: params.id
            }
          })
        : null,
    {
      select: (data) => {
        return data?.data;
      },
      staleTime: 0,
      enabled: !!params
    }
  );

export const useScreenListData = () =>
  useQuery(
    [getAllScreenGroupList.queryKeyName],
    () => performApiAction<ScreenListResponse>(getAllScreenGroupList, {}),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );

export const usePrivilegeListData = () =>
  useQuery(
    [getAllPrivilegeList.queryKeyName],
    () => performApiAction<ScreenListResponse>(getAllPrivilegeList, {}),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );

export const usePrivilegeCreator = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: RolePrivilegeRequestData) => {
      return performApiAction(editPrivilege, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getScreenByRoleId.queryKeyName]); // invalidating cache query and refetching all post
        queryClient.invalidateQueries([getAllScreenListForConfig.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useRoleScreenCreator = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: RoleScreenRequestData) => {
      return performApiAction(addScreen, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getScreenByRoleId.queryKeyName]); // invalidating cache query and refetching all post
        queryClient.invalidateQueries([getAllScreenListForConfig.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useScreenListByRoleIdData = (roleId: number | string) =>
  useQuery(
    [getScreenByRoleId.queryKeyName, roleId],
    () =>
      performApiAction<ScreenByRoleResponse>(getScreenByRoleId, {
        pathVariables: { id: roleId }
      }),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );

export const useDeleteScreenByRoleIdMenuId = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: MenuIdRoleIdParams) => {
      return performApiAction(deleteScreenByRoleId, {
        pathVariables: { roleId: params.roleId, menuId: params.menuId }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getScreenByRoleId.queryKeyName]);
        queryClient.invalidateQueries([getAllScreenListForConfig.queryKeyName]);
      }
    }
  );
};
