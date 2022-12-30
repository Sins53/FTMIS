import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BudgetPresentationResponse } from './budgetPresentationSchema';

const {
  getFedToLocalBudgetPresentationDetails,
  createFedToLocalBudgetPresentationData,
  getFedToLocalBudgetPresentationListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.budgetPresentation;

export const useFedToLocalBudgetPresentationDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalBudgetPresentationDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<BudgetPresentationResponse>(getFedToLocalBudgetPresentationDetails, {
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

export const useFedToLocalBudgetPresentationImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalBudgetPresentationData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalBudgetPresentationDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalBudgetPresentationListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalBudgetPresentationListCSV));
};
