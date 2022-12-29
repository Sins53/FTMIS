import performApiAction, { CustomResponse } from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useQuery } from 'react-query';
import { PerformanceGrantData } from './performanceBasedSchema';

const { getIndicatorList } = apiList.equalizationGrant;

export const useIndicatorData = ({ grant, module }: { grant?: string; module?: string }) =>
  useQuery(
    [getIndicatorList.queryKeyName, grant, module],
    () =>
      performApiAction<CustomResponse<PerformanceGrantData[]>>(getIndicatorList, {
        params: {
          ...removeEmptyValueFromObject({
            grant: grant,
            module: module
          })
        }
      }),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true,
      enabled: !!grant && !!module
    }
  );
