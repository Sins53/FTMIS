import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PeriodicPlanResponse } from './periodicPlanSchema';

const {
  getFedToLocalPeriodicPlanDetails,
  createFedToLocalPeriodicPlanData,
  getFedToLocalPeriodicPlanListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.periodicPlan;

export const useFedToLocalPeriodicPlanDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalPeriodicPlanDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<PeriodicPlanResponse>(getFedToLocalPeriodicPlanDetails, {
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

export const useFedToLocalPeriodicPlanImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalPeriodicPlanData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalPeriodicPlanDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalPeriodicPlanListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalPeriodicPlanListCSV));
};
