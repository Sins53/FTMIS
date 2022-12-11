import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useQuery, useQueryClient } from 'react-query';

const { getHdiDetails, calculateHdiData } = apiList.equalizationGrant.formulaBased.hdi;

export const useHdiDetailsData = () =>
  useQuery([getHdiDetails.queryKeyName], () => performApiAction<any>(getHdiDetails), {
    select: (data) => {
      return data.data?.data;
    },
    keepPreviousData: true
  });

export const useCalculateHdiData = () => {
  const queryClient = useQueryClient();
  return useQuery([calculateHdiData.queryKeyName], () => performApiAction<any>(calculateHdiData), {
    select: (data) => {
      return data.data?.data;
    },
    keepPreviousData: true,
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries([getHdiDetails.queryKeyName]);
    }
  });
};
