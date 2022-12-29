import performApiAction, { CustomResponse } from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BudgetStatusData, BudgetData, FinalGrantDataResponse } from './financialGrantSchema';

const { getBudgetStatus, createBudgetStatus, editBudget, getBudgetById, getFinalResult } =
  apiList.equalizationGrant;

export interface BudgetDataParams {
  fiscal_year?: string | number;
}

export const useBudgetData = ({ fiscal_year }: BudgetDataParams) =>
  useQuery(
    [getBudgetStatus.queryKeyName, fiscal_year],
    () =>
      performApiAction<CustomResponse<BudgetStatusData>>(getBudgetStatus, {
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
      keepPreviousData: true,
      staleTime: 0
    }
  );

export const useBudgetCreate = (isEditable: boolean) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: BudgetData) => {
      if (isEditable) {
        const pathVariables = requestData.id ? { id: requestData.id } : undefined;

        return performApiAction(editBudget, {
          requestData,
          pathVariables
        });
      } else {
        return performApiAction(createBudgetStatus, { requestData });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getBudgetStatus.queryKeyName);
      }
    }
  );
};

export const useBudgetDataById = (id: number | string | undefined) =>
  useQuery(
    [getBudgetById.queryKeyName, id],
    () =>
      performApiAction<CustomResponse<BudgetData>>(getBudgetById, {
        pathVariables: { id: id || '' }
      }),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useEqualizationGrantFinalResult = ({
  fiscal_year
}: {
  fiscal_year: string | number;
}) =>
  useQuery(
    [getFinalResult.queryKeyName, fiscal_year],
    () =>
      performApiAction<FinalGrantDataResponse>(getFinalResult, {
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
