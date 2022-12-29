import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CapitalExpenseRatioResponse } from './capitalExpenseRatioSchema';

const {
  getFedToLocalCapitalExpenseRatioDetails,
  createFedToLocalCapitalExpenseRatioData,
  getFedToLocalCapitalExpenseRatioListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.capitalExpenseRatio;

export const useFedToLocalCapitalExpenseRatioDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalCapitalExpenseRatioDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<CapitalExpenseRatioResponse>(getFedToLocalCapitalExpenseRatioDetails, {
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

export const useFedToLocalCapitalExpenseRatioImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalCapitalExpenseRatioData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalCapitalExpenseRatioDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalCapitalExpenseRatioListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalCapitalExpenseRatioListCSV));
};
