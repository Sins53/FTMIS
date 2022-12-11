import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  RevenueCollectionRatioDetailsDataResponse,
  RevenueCollectionRatioInitialValueProps
} from './revenueCollectionRatioSchema';

const { getRevenueCollectionRatioDetails, createRevenueCollectionRatioData } =
  apiList.equalizationGrant.performanceBased.revenueCollectionRatio;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useRevenueCollectionRatioDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getRevenueCollectionRatioDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<RevenueCollectionRatioDetailsDataResponse>(
        getRevenueCollectionRatioDetails,
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
export const useRevenueCollectionRatioDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: RevenueCollectionRatioInitialValueProps) => {
      return performApiAction(createRevenueCollectionRatioData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getRevenueCollectionRatioDetails.queryKeyName]);
      }
    }
  );
};
