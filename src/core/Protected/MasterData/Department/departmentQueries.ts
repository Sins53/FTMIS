import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DepartmentRequestData, DepartmentResponse, ProvinceOptionResponseData } from './schema';

const {
  createDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
  filterprovinceListByDepartmentId
} = apiList.masterData.department;

export const useDepartmentData = ({
  page_size = '',
  page = '',
  escape_pg,
  search
}: PaginatedParams) =>
  useQuery(
    [getAllDepartment.queryKeyName, page, page_size, escape_pg, search],
    () =>
      performApiAction<DepartmentResponse>(getAllDepartment, {
        params: {
          ...removeEmptyValueFromObject({
            page_size,
            page,
            escape_pg,
            search
          })
        }
      }),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useDepartmentCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: DepartmentRequestData) => {
      if (isEditable && requestData.id) {
        return performApiAction(updateDepartment, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(createDepartment, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllDepartment.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useDeleteLoanType = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteDepartment, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllDepartment.queryKeyName);
      }
    }
  );
};

export const useFilterByDepartmentId = (id: number | null) =>
  useQuery(
    [filterprovinceListByDepartmentId.queryKeyName, id],
    () =>
      performApiAction<ProvinceOptionResponseData>(filterprovinceListByDepartmentId, {
        params: {
          ...removeEmptyValueFromObject({
            id
          })
        }
      }),
    {
      select: (data) => {
        return data.data;
      },
      enabled: !!id
    }
  );
