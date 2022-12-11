import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AirQualityDetailsDataResponse, AirQualityFormProps } from './AirQualityIndexSchema';

const { createAirQualityIndex, getAirQualityIndex } =
  apiList.equalizationGrant.performanceBased.airQualityIndex;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useAirQualityIndexData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getAirQualityIndex.queryKeyName, fiscal_year],
    () =>
      performApiAction<AirQualityDetailsDataResponse>(getAirQualityIndex, {
        params: {
          ...removeEmptyValueFromObject({
            fiscal_year
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

export const useAirQualityIndicatorCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: AirQualityFormProps) => {
      return performApiAction(createAirQualityIndex, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAirQualityIndex.queryKeyName]);
      }
    }
  );
};
