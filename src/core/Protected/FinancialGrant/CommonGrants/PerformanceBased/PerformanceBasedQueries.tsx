import performApiAction, { CustomResponse } from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  PerformanceGrantDatum,
  PerformanceGrantFormProps,
  PerformanceGrantResultDataResponse
} from './performanceBasedSchema';
import { APIDetailType } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';

const {
  createPerformanceBasedGrant,
  getPerformanceBasedGrant,
  updatePerformanceBasedGrant,
  getPerformanceGrantFinalResult
} = apiList.equalizationGrant.performanceBased;
const {
  getFedToLocalPerformanceBasedGrant,
  createFedToLocalPerformanceBasedGrant,
  updateFedToLocalPerformanceBasedGrant
} = apiList.equalizationGrant.fedToLocal.performanceBased;

export const usePerformanceGrantCreator = (isProvince: boolean, isEditable?: boolean) => {
  let keyName: APIDetailType;
  if (isProvince) {
    keyName = isEditable ? updatePerformanceBasedGrant : createPerformanceBasedGrant;
  } else {
    keyName = isEditable
      ? updateFedToLocalPerformanceBasedGrant
      : createFedToLocalPerformanceBasedGrant;
  }
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: PerformanceGrantFormProps) => {
      if (isEditable && requestData.id) {
        return performApiAction(keyName, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(keyName, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getPerformanceBasedGrant.queryKeyName]);
        queryClient.invalidateQueries([getFedToLocalPerformanceBasedGrant.queryKeyName]);
      }
    }
  );
};

export const usePerformanceGrantData = (
  budget: number | undefined | string,
  isProvince: boolean
) => {
  let keyName: APIDetailType;
  if (isProvince) {
    keyName = getPerformanceBasedGrant;
  } else {
    keyName = getFedToLocalPerformanceBasedGrant;
  }
  return useQuery(
    [keyName.queryKeyName, budget],
    () =>
      performApiAction<CustomResponse<PerformanceGrantDatum>>(keyName, {
        params: { budget: budget }
      }),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
};
export const usePerformanceGrantFinalResult = ({
  fiscal_year
}: {
  fiscal_year?: string | number;
}) =>
  useQuery(
    [getPerformanceGrantFinalResult.queryKeyName, fiscal_year],
    () =>
      performApiAction<PerformanceGrantResultDataResponse>(getPerformanceGrantFinalResult, {
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
