import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SeePerformanceResponse } from './seePerformanceSchema';

const {
  getFedToLocalSeePerformanceDetails,
  createFedToLocalSeePerformanceData,
  getFedToLocalSeePerformanceListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.seePerformance;

export const useFedToLocalSeePerformanceDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalSeePerformanceDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<SeePerformanceResponse>(getFedToLocalSeePerformanceDetails, {
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

export const useFedToLocalSeePerformanceImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalSeePerformanceData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalSeePerformanceDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalSeePerformanceListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalSeePerformanceListCSV));
};
