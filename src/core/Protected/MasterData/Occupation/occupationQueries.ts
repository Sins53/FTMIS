import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { APIResponse, RequestData } from './occupationSchema';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';

const { getOccupationtList, editOccupationtItem, createOccupationtItem, deleteOccupationtItem } =
  apiList.masterData.occupation;

export const useOccupationData = ({
  page_size = '',
  page = '',
  escape_pg,
  search
}: PaginatedParams) =>
  useQuery(
    [getOccupationtList.queryKeyName, page, page_size, search],
    () =>
      performApiAction<APIResponse>(getOccupationtList, {
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

export const useOccupationCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: RequestData) => {
      if (isEditable && requestData.id) {
        return performApiAction(editOccupationtItem, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(createOccupationtItem, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getOccupationtList.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useOccupationDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteOccupationtItem, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getOccupationtList.queryKeyName);
      }
    }
  );
};
