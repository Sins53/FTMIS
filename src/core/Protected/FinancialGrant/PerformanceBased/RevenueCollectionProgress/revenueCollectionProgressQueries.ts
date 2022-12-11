import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  RevenueCollectionProgressDetailsDataResponse,
  RevenueCollectionProgressInitialValueProps
} from './revenueCollectionProgressSchema';

const { getRevenueCollectionProgressDetails, createRevenueCollectionProgressData } =
  apiList.equalizationGrant.performanceBased.revenueCollectionProgress;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useRevenueCollectionProgressDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getRevenueCollectionProgressDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<RevenueCollectionProgressDetailsDataResponse>(
        getRevenueCollectionProgressDetails,
        {
          params: {
            ...removeEmptyValueFromObject({
              fiscal_year
            })
          }
        }
      ),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
export const useRevenueCollectionProgressDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: RevenueCollectionProgressInitialValueProps) => {
      return performApiAction(createRevenueCollectionProgressData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getRevenueCollectionProgressDetails.queryKeyName]);
      }
    }
  );
};
