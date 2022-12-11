import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useQuery, useQueryClient } from 'react-query';
import { RoadDensityDetailDataResponse } from './roadDensitySchema';

const { getRoadDensityDetails, calculateRoadDensityData } =
  apiList.equalizationGrant.formulaBased.roadDensity;

export const useRoadDensityDetailsData = () =>
  useQuery(
    [getRoadDensityDetails.queryKeyName],
    () => performApiAction<RoadDensityDetailDataResponse>(getRoadDensityDetails),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useCalculateRoadDensityData = () => {
  const queryClient = useQueryClient();
  return useQuery(
    [calculateRoadDensityData.queryKeyName],
    () => performApiAction<any>(calculateRoadDensityData),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true,
      enabled: false,
      onSuccess: () => {
        queryClient.invalidateQueries([getRoadDensityDetails.queryKeyName]);
      }
    }
  );
};
