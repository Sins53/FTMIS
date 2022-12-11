import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UnassignedUserResponse } from '../../Roles/schema';

const { assignUserInRole, deleteUserFromRole, getRoleUnAssignedUser } =
  apiList.roleManagement.screenGroup;
const { getRoleDetailByRoleId } = apiList.roleManagement.roleSetup;

export interface AssignUserRequestData {
  users: Array<string | number>;
}

export const useAssignUserInRole = (roleId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: AssignUserRequestData) => {
      return performApiAction(assignUserInRole, {
        requestData,
        pathVariables: { id: roleId },
        enableSuccessToast: true
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getRoleDetailByRoleId.queryKeyName]);
        queryClient.invalidateQueries([getRoleUnAssignedUser.queryKeyName]);
      }
    }
  );
};

export const useRoleUnassignedUserData = (roleId: number, searchText?: string) =>
  useQuery(
    [getRoleUnAssignedUser.queryKeyName, roleId, searchText],
    () =>
      performApiAction<UnassignedUserResponse>(getRoleUnAssignedUser, {
        pathVariables: { id: roleId },
        params: {
          search: searchText
        }
      }),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );

export const useRemoveUserInRole = (roleId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: AssignUserRequestData) => {
      return performApiAction(deleteUserFromRole, {
        requestData,
        pathVariables: { id: roleId }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getRoleDetailByRoleId.queryKeyName]);
        queryClient.invalidateQueries([getRoleUnAssignedUser.queryKeyName]);
      }
    }
  );
};
