import performApiAction, { CustomResponse } from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IndicatorMarksData } from './IndicatorSchema';

const { createIndicatorMarks, getIndicatorMarks } = apiList.masterData.indicator;

export const useIndicatorMarksCreator = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: any) => {
      return performApiAction(createIndicatorMarks, {
        requestData,
        enableSuccessToast: true
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getIndicatorMarks.queryKeyName]);
      }
    }
  );
};

export const useIndicatorMarksData = ({
  grant_type,
  module
}: {
  grant_type: string;
  module: string | null;
}) => {
  return useQuery(
    [getIndicatorMarks.queryKeyName, grant_type, module],
    () =>
      performApiAction<CustomResponse<IndicatorMarksData[]>>(getIndicatorMarks, {
        params: {
          ...removeEmptyValueFromObject({
            grant_type,
            module
          })
        }
      }),
    {
      select: (data) => {
        return data?.data?.data;
      },
      enabled: !!module,
      keepPreviousData: true
    }
  );
};
