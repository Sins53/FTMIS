import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { NetAdmissionRateResponse } from './netAdmissionRateSchema';

const {
  getFedToLocalNetAdmissionRateDetails,
  createFedToLocalNetAdmissionRateData,
  getFedToLocalNetAdmissionRateListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.netAdmissionRate;

export const useFedToLocalNetAdmissionRateDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalNetAdmissionRateDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<NetAdmissionRateResponse>(getFedToLocalNetAdmissionRateDetails, {
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

export const useFedToLocalNetAdmissionRateImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalNetAdmissionRateData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalNetAdmissionRateDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalNetAdmissionRateListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalNetAdmissionRateListCSV));
};
