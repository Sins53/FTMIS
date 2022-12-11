import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  MenuIdUserIdParams,
  ScreenByUserResponse,
  UserPrivilegeRequestData,
  UserScreenRequestData
} from './schema';

const { addEditScreen, getScreenByUserId, createScreens } = apiList.userManagement.UserScreenGroup;
const { deleteScreenByMenuIdUserId } = apiList.userManagement.UserAccessMapping;
const { getAllScreenListForConfig } = apiList.roleManagement.screenGroup;

export const useUserScreenCreator = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: UserScreenRequestData) => {
      return performApiAction(createScreens, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getScreenByUserId.queryKeyName]); // invalidating cache query and refetching all post
        queryClient.invalidateQueries([getAllScreenListForConfig.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useUserPrivilegeCreator = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: UserPrivilegeRequestData) => {
      return performApiAction(addEditScreen, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getScreenByUserId.queryKeyName]); // invalidating cache query and refetching all post
        queryClient.invalidateQueries([getAllScreenListForConfig.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useScreenListByUserIdData = (userId: number | string) =>
  useQuery(
    [getScreenByUserId.queryKeyName, userId],
    () =>
      performApiAction<ScreenByUserResponse>(getScreenByUserId, {
        pathVariables: { id: userId }
      }),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );

export const useDeleteScreenByUserIdMenuId = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: MenuIdUserIdParams) => {
      return performApiAction(deleteScreenByMenuIdUserId, {
        pathVariables: { userId: params.userId, menuId: params.menuId }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getScreenByUserId.queryKeyName]);
        queryClient.invalidateQueries([getAllScreenListForConfig.queryKeyName]);
      }
    }
  );
};
