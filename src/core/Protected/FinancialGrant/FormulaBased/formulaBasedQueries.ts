import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FormulaGrantDataResponse, formulaGrantInitialValueProp } from './formulaBasedSchema';

const {
  getFormulaBasedGrant,
  createFormulaBasedGrant,
  updateFormulaBasedGrant,
  getFormulaBasedGrantFinalResult
} = apiList.equalizationGrant.formulaBased;

export const useFormulaGrantData = (module?: string) =>
  useQuery(
    [getFormulaBasedGrant.queryKeyName],
    () =>
      performApiAction<any>(getFormulaBasedGrant, {
        params: { module: module }
      }),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useFormulaGrantCreator = (isEditable?: boolean, module?: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: formulaGrantInitialValueProp) => {
      if (isEditable && requestData.id) {
        return performApiAction(updateFormulaBasedGrant, {
          requestData,
          pathVariables: { id: requestData.id },
          params: { module: module }
        });
      } else {
        return performApiAction(createFormulaBasedGrant, {
          requestData,
          params: { module: module }
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getFormulaBasedGrant.queryKeyName]);
      }
    }
  );
};

export const useFormulaGrantFinalResult = () =>
  useQuery(
    [getFormulaBasedGrantFinalResult.queryKeyName],
    () => performApiAction<FormulaGrantDataResponse>(getFormulaBasedGrantFinalResult),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
