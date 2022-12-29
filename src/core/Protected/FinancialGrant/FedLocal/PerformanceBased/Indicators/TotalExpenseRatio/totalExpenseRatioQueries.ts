import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TotalExpenseRatioResponse } from './totalExpenseRatioSchema';

const {
  getFedToLocalTotalExpenseRatioDetails,
  createFedToLocalTotalExpenseRatioData,
  getFedToLocalTotalExpenseRatioListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.totalExpenseRatio;

export const useFedToLocalTotalExpenseRatioDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalTotalExpenseRatioDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<TotalExpenseRatioResponse>(getFedToLocalTotalExpenseRatioDetails, {
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

export const useFedToLocalTotalExpenseRatioImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalTotalExpenseRatioData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalTotalExpenseRatioDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalTotalExpenseRatioListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalTotalExpenseRatioListCSV));
};
