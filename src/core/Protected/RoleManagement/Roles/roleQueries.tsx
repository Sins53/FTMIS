import { apiList } from '@/store/apiDetails';
import performApiAction from '@/helper/default-action';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { roleFormProps, RoleDataResponse, RoleDetailDataResponse } from './schema';

const { createRole, updateRole, getAllRole, deleteRoleById, getRoleDetailByRoleId } =
  apiList.roleManagement.roleSetup;

const useRoleCreator = (isEdit: boolean) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: roleFormProps) => {
      if (!isEdit) {
        return performApiAction(createRole, { requestData });
      } else {
        const pathVariables = requestData.id ? { id: requestData.id } : undefined;
        return performApiAction(updateRole, { requestData, pathVariables });
      }
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllRole.queryKeyName);
      }
    }
  );
};

const useRoleData = ({ page_size, page, sort, search }: params = {}) =>
  useQuery(
    [getAllRole.queryKeyName, page, page_size, search],
    () =>
      performApiAction<RoleDataResponse>(getAllRole, {
        params: {
          page_size,
          page,
          sort,
          search
        }
      }),
    {
      select: (data) => {
        return data?.data?.data;
      },
      keepPreviousData: true
    }
  );

const useRoleDetailByRoleId = (roleId: number) =>
  useQuery(
    [getRoleDetailByRoleId.queryKeyName],
    () =>
      performApiAction<RoleDetailDataResponse>(getRoleDetailByRoleId, {
        pathVariables: { id: roleId }
      }),
    {
      select: (data) => {
        return data?.data?.data;
      }
    }
  );

const useRoleDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteRoleById, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllRole.queryKeyName);
      }
    }
  );
};

export { useRoleCreator, useRoleData, useRoleDelete, useRoleDetailByRoleId };
