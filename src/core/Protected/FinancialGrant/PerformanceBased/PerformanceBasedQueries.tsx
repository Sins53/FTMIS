import performApiAction, { CustomResponse } from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  PerformanceGrantData,
  PerformanceGrantDatum,
  PerformanceGrantFormProps,
  PerformanceGrantResultDataResponse
} from './performanceBasedSchema';

const { createPerformanceBasedGrant, getPerformanceBasedGrant, getPerformanceGrantFinalResult } =
  apiList.equalizationGrant.performanceBased;

const { getIndicatorList } = apiList.equalizationGrant;

export const usePerformanceGrantCreate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: PerformanceGrantFormProps) => {
      // if (isEditable) {
      //   const pathVariables = requestData.id ? { id: requestData.id } : undefined;

      //   return performApiAction(editBudget, {
      //     requestData,
      //     pathVariables
      //   });
      // } else {
      return performApiAction(createPerformanceBasedGrant, { requestData });
      // }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getPerformanceBasedGrant.queryKeyName);
      }
    }
  );
};

export const usePerformanceGrantData = (budget: number | undefined | string) =>
  useQuery(
    [getPerformanceBasedGrant.queryKeyName, budget],
    () => performApiAction<CustomResponse<PerformanceGrantDatum[]>>(getPerformanceBasedGrant),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useIndicatorData = ({ grant }: { grant: string }) =>
  useQuery(
    [getIndicatorList.queryKeyName, grant],
    () =>
      performApiAction<CustomResponse<PerformanceGrantData[]>>(getIndicatorList, {
        params: {
          ...removeEmptyValueFromObject({
            grant: grant
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

export const usePerformanceGrantFinalResult = () =>
  useQuery(
    [getPerformanceGrantFinalResult.queryKeyName],
    () => performApiAction<PerformanceGrantResultDataResponse>(getPerformanceGrantFinalResult),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
