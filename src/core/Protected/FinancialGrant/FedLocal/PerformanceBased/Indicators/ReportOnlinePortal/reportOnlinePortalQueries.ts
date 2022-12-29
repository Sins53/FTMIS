import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReportOnlinePortalResponse } from './reportOnlinePortalSchema';

const {
  getFedToLocalReportOnlinePortalDetails,
  createFedToLocalReportOnlinePortalData,
  getFedToLocalReportOnlinePortalListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.reportOnlinePortal;

export const useFedToLocalReportOnlinePortalDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalReportOnlinePortalDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<ReportOnlinePortalResponse>(getFedToLocalReportOnlinePortalDetails, {
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

export const useFedToLocalReportOnlinePortalImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalReportOnlinePortalData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalReportOnlinePortalDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalReportOnlinePortalListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalReportOnlinePortalListCSV));
};
