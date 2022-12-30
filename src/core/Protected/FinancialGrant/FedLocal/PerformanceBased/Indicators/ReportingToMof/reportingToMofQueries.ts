import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReportingToMofResponse } from './reportingToMofSchema';

const {
  getFedToLocalReportingToMofDetails,
  createFedToLocalReportingToMofData,
  getFedToLocalReportingToMofListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.reportingToMof;

export const useFedToLocalReportingToMofDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalReportingToMofDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<ReportingToMofResponse>(getFedToLocalReportingToMofDetails, {
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

export const useFedToLocalReportingToMofImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalReportingToMofData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalReportingToMofDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalReportingToMofListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalReportingToMofListCSV));
};
