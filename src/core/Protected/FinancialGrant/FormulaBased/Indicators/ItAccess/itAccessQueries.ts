import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useQuery, useQueryClient } from 'react-query';
import { ItAccessDetailDataResponse } from './itAccessSchema';

const { getItAccessDetails, calculateItAccessData } =
  apiList.equalizationGrant.formulaBased.itAccess;

export const useItAccessDetailsData = () =>
  useQuery(
    [getItAccessDetails.queryKeyName],
    () => performApiAction<ItAccessDetailDataResponse>(getItAccessDetails),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useCalculateItAccessData = () => {
  const queryClient = useQueryClient();
  return useQuery(
    [calculateItAccessData.queryKeyName],
    () => performApiAction<any>(calculateItAccessData),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true,
      enabled: false,
      onSuccess: () => {
        queryClient.invalidateQueries([getItAccessDetails.queryKeyName]);
      }
    }
  );
};
