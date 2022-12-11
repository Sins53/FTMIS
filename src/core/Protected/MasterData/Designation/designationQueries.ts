import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { APIResponse, RequestData } from './designationSchema';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';

const { getAllDesignation, editDesignation, createDesignation, deleteDesignation } =
  apiList.masterData.designation;

export const useDesignationData = ({
  page_size = '',
  page = '',
  escape_pg,
  search
}: PaginatedParams) =>
  useQuery(
    [getAllDesignation.queryKeyName, page, page_size, search],
    () =>
      performApiAction<APIResponse>(getAllDesignation, {
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

export const useDesignationCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: RequestData) => {
      if (isEditable && requestData.id) {
        return performApiAction(editDesignation, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(createDesignation, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllDesignation.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useDesignationDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteDesignation, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllDesignation.queryKeyName);
      }
    }
  );
};
