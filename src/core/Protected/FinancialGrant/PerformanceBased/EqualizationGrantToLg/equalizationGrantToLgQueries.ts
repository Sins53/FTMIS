import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  EqualizationGrantToLgDetailsDataResponse,
  EqualizationGrantToLgInitialValueProps
} from './equalizationGrantToLgSchema';

const { getEqualizationGrantToLgDetails, createEqualizationGrantToLgData } =
  apiList.equalizationGrant.performanceBased.equalizationGrantToLg;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useEqualizationGrantToLgDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getEqualizationGrantToLgDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<EqualizationGrantToLgDetailsDataResponse>(getEqualizationGrantToLgDetails, {
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
export const useEqualizationGrantToLgDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: EqualizationGrantToLgInitialValueProps) => {
      return performApiAction(createEqualizationGrantToLgData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getEqualizationGrantToLgDetails.queryKeyName]);
      }
    }
  );
};
