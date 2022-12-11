import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  budgetReviewDetailsDataResponse,
  BudgetReviewInitialValueProps
} from './budgetReviewSchema';

const { getBudgetReviewDetails, createBudgetReviewData } =
  apiList.equalizationGrant.performanceBased.budgetReview;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useBudgetReviewDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getBudgetReviewDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<budgetReviewDetailsDataResponse>(getBudgetReviewDetails, {
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
export const useBudgetReviewDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: BudgetReviewInitialValueProps) => {
      return performApiAction(createBudgetReviewData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getBudgetReviewDetails.queryKeyName]);
      }
    }
  );
};
