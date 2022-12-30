import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TaxDistributionResponse } from './taxDistributionSchema';

const {
  getFedToLocalTaxDistributionDetails,
  createFedToLocalTaxDistributionData,
  getFedToLocalTaxDistributionListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.taxDistribution;

export const useFedToLocalTaxDistributionDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalTaxDistributionDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<TaxDistributionResponse>(getFedToLocalTaxDistributionDetails, {
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

export const useFedToLocalTaxDistributionImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalTaxDistributionData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalTaxDistributionDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalTaxDistributionListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalTaxDistributionListCSV));
};
