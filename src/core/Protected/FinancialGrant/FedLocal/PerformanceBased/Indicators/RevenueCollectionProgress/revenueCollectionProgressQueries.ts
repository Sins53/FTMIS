import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { RevenueProgressResponse } from './revenueProgressSchema';

const {
  getFedToLocalRevenueCollectionProgressDetails,
  createFedToLocalRevenueCollectionProgressData,
  getFedToLocalRevenueCollectionProgressListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.revenueCollectionProgress;

export const useFedToLocalRevenueCollectionProgressDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalRevenueCollectionProgressDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<RevenueProgressResponse>(getFedToLocalRevenueCollectionProgressDetails, {
        params: {
          ...removeEmptyValueFromObject({
            page,
            page_size,
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

export const useFedToLocalRevenueProgressImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalRevenueCollectionProgressData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalRevenueCollectionProgressDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalRevenueProgressListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalRevenueCollectionProgressListCSV));
};
