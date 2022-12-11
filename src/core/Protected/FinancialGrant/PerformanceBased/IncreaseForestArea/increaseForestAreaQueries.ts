import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ForestAreaDetailsDataResponse,
  IncreaseForestAreaInitialValueProps
} from './increaseForestAreaSchema';

const { getIncreaseForestAreaDetails, createIncreaseForestAreaData } =
  apiList.equalizationGrant.performanceBased.increaseForestArea;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useIncreaseForestAreaDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getIncreaseForestAreaDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<ForestAreaDetailsDataResponse>(getIncreaseForestAreaDetails, {
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
export const useIncreaseForestAreaDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: IncreaseForestAreaInitialValueProps) => {
      return performApiAction(createIncreaseForestAreaData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getIncreaseForestAreaDetails.queryKeyName]);
      }
    }
  );
};
