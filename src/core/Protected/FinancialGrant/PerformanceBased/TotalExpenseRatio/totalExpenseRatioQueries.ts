import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  TotalExpenseRatioDetailsDataResponse,
  TotalExpenseRatioInitialValueProps
} from './totalExpenseRatioSchema';

const { getTotalExpenseRatioDetails, createTotalExpenseRatioData } =
  apiList.equalizationGrant.performanceBased.totalExpenseRatio;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useTotalExpenseRatioDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getTotalExpenseRatioDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<TotalExpenseRatioDetailsDataResponse>(getTotalExpenseRatioDetails, {
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
export const useTotalExpenseRatioDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: TotalExpenseRatioInitialValueProps) => {
      return performApiAction(createTotalExpenseRatioData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getTotalExpenseRatioDetails.queryKeyName]);
      }
    }
  );
};
