import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useQuery, useQueryClient } from 'react-query';
import { RevenueConditionDetailDataResponse } from './revenueConditionSchema';

const { getRevenueConditionDetails, calculateRevenueConditionData } =
  apiList.equalizationGrant.formulaBased.revenueCondition;

export const useRevenueConditionDetailsData = () =>
  useQuery(
    [getRevenueConditionDetails.queryKeyName],
    () => performApiAction<RevenueConditionDetailDataResponse>(getRevenueConditionDetails),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useCalculateRevenueConditionData = () => {
  const queryClient = useQueryClient();
  return useQuery(
    [calculateRevenueConditionData.queryKeyName],
    () => performApiAction<any>(calculateRevenueConditionData),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true,
      enabled: false,
      onSuccess: () => {
        queryClient.invalidateQueries([getRevenueConditionDetails.queryKeyName]);
      }
    }
  );
};
