import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { APIResponse, RequestData } from './selfEmploymentSchema';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';

const {
  getSelfEmploymentList,
  editSelfEmploymentItem,
  createSelfEmploymentItem,
  deleteSelfEmploymentItem
} = apiList.masterData.selfEmployment;

export const useSelfEmploymentData = ({
  page_size = '',
  page = '',
  escape_pg,
  search
}: PaginatedParams) =>
  useQuery(
    [getSelfEmploymentList.queryKeyName, page, page_size, search],
    () =>
      performApiAction<APIResponse>(getSelfEmploymentList, {
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

export const useSelfEmploymentCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: RequestData) => {
      if (isEditable && requestData.id) {
        return performApiAction(editSelfEmploymentItem, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(createSelfEmploymentItem, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getSelfEmploymentList.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useSelfEmploymentDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteSelfEmploymentItem, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getSelfEmploymentList.queryKeyName);
      }
    }
  );
};
