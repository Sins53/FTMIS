import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  DrinkingWaterDetailsDataResponse,
  DrinkingWaterInitialValueProps
} from './drinkingWaterSchema';

const { getDrinkingWaterDetails, createDrinkingWaterData } =
  apiList.equalizationGrant.formulaBased.drinkingWater;

export const useDrinkingWaterDetailsData = () =>
  useQuery(
    [getDrinkingWaterDetails.queryKeyName],
    () => performApiAction<DrinkingWaterDetailsDataResponse>(getDrinkingWaterDetails),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
export const useDrinkingWaterDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: DrinkingWaterInitialValueProps) => {
      return performApiAction(createDrinkingWaterData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getDrinkingWaterDetails.queryKeyName]);
      }
    }
  );
};
