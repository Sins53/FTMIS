import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  CapitalExpenseRatioDetailsDataResponse,
  CapitalExpenseRatioInitialValueProps
} from './capitalExpenseRatioSchema';

const { getCapitalExpenseRatioDetails, createCapitalExpenseRatioData } =
  apiList.equalizationGrant.performanceBased.capitalExpenseRatio;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useCapitalExpenseRatioDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getCapitalExpenseRatioDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<CapitalExpenseRatioDetailsDataResponse>(getCapitalExpenseRatioDetails, {
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
export const useCapitalExpenseRatioDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: CapitalExpenseRatioInitialValueProps) => {
      return performApiAction(createCapitalExpenseRatioData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getCapitalExpenseRatioDetails.queryKeyName]);
      }
    }
  );
};
