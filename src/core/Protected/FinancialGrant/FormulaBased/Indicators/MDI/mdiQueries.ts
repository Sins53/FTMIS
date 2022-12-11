import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useQuery, useQueryClient } from 'react-query';
import { MdiDetailDataResponse } from './mdiSchema';

const { getMdiDetails, calculateMdiData } = apiList.equalizationGrant.formulaBased.mdi;

export const useMdiDetailsData = () =>
  useQuery(
    [getMdiDetails.queryKeyName],
    () => performApiAction<MdiDetailDataResponse>(getMdiDetails),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useCalculateMdiData = () => {
  const queryClient = useQueryClient();
  return useQuery([calculateMdiData.queryKeyName], () => performApiAction<any>(calculateMdiData), {
    select: (data) => {
      return data.data?.data;
    },
    keepPreviousData: true,
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries([getMdiDetails.queryKeyName]);
    }
  });
};
