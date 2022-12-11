import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { branchRequestData, BranchDataResponse } from './schema';

interface IProvinceParams extends PaginatedParams {
  province?: number | string | undefined;
  view?: string;
}

const { getAllBranch, editBranchById, addNewBranch, deleteBranchById, branchBulkImport } =
  apiList.masterData.branches;

const useBranchesData = ({
  page_size = '',
  page = '',
  sort = '',
  escape_pg,
  search,
  view,
  province = undefined
}: IProvinceParams) =>
  useQuery(
    [getAllBranch.queryKeyName, page, page_size, search, province, view],
    () =>
      performApiAction<BranchDataResponse>(getAllBranch, {
        params: {
          ...removeEmptyValueFromObject({
            page_size,
            page,
            sort,
            escape_pg,
            province,
            search,
            view
          })
        }
      }),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );

const useBranchCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: branchRequestData) => {
      if (isEditable && requestData.id) {
        return performApiAction(editBranchById, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(addNewBranch, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllBranch.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteBranchById, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllBranch.queryKeyName);
      }
    }
  );
};

export const useBranchImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(branchBulkImport, { requestData, enableSuccessToast: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllBranch.queryKeyName);
      }
    }
  );
};

export { useBranchesData, useBranchCreator };
