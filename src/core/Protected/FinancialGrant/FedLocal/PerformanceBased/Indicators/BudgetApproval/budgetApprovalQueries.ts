import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BudgetApprovalResponse } from './budgetApprovalSchema';

const {
  getFedToLocalBudgetApprovalDetails,
  createFedToLocalBudgetApprovalData,
  getFedToLocalBudgetApprovalListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.budgetApproval;

export const useFedToLocalBudgetApprovalDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalBudgetApprovalDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<BudgetApprovalResponse>(getFedToLocalBudgetApprovalDetails, {
        params: {
          ...removeEmptyValueFromObject({
            page,
            page_size,
            search
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

export const useFedToLocalBudgetApprovalImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalBudgetApprovalData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalBudgetApprovalDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalBudgetApprovalListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalBudgetApprovalListCSV));
};
