import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { RevenueRatioResponse } from './revenueRatioSchema';

const {
  getFedToLocalRevenueCollectionRatioDetails,
  createFedToLocalRevenueCollectionRatioData,
  getFedToLocalRevenueCollectionRatioListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.revenueCollectionRatio;

export const useFedToLocalRevenueCollectionRatioDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalRevenueCollectionRatioDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<RevenueRatioResponse>(getFedToLocalRevenueCollectionRatioDetails, {
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

export const useFedToLocalRevenueRatioImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalRevenueCollectionRatioData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalRevenueCollectionRatioDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalRevenueRatioListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalRevenueCollectionRatioListCSV));
};
