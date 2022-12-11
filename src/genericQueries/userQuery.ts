import { apiList } from '../store/apiDetails/index';
import { useQuery } from 'react-query';
import performApiAction from '@/helper/default-action';
import { ApplicationInterface, PublicInit, UserListResponse } from './genericQueriesSchema';
import useAuth from '@/hooks/useAuth';

const { getUserDetail, getUserList, getUserById } = apiList.userManagement.userDetail;
const { getPublicInitDetail } = apiList.general;

export const useUserData = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated, 'isAuthenticated');
  return useQuery(
    [getUserDetail.queryKeyName],
    () => performApiAction<ApplicationInterface>(getUserDetail),
    {
      select: (data) => {
        return data;
      },
      staleTime: 0,
      enabled: !!isAuthenticated
    }
  );
};

export const useUserList = (params: { extra: boolean; name: string }) =>
  useQuery([getUserList.queryKeyName, params.name], () =>
    performApiAction<UserListResponse>(getUserList, { params })
  );

export const useUserById = (params: { userId: string }) =>
  useQuery(
    [getUserById.queryKeyName, params.userId],
    () => {
      return performApiAction<UserListResponse>(getUserById, {
        pathVariables: { userId: Number(params.userId) }
      });
    },
    {
      select: (data) => {
        return data.data?.data;
      }
    }
  );

export const usePublicInitData = () => {
  const { isAuthenticated } = useAuth();
  return useQuery(
    [getPublicInitDetail.queryKeyName],
    () => performApiAction<PublicInit>(getPublicInitDetail),
    {
      select: (data) => {
        return data.data;
      },
      staleTime: 0,
      enabled: !isAuthenticated
    }
  );
};
