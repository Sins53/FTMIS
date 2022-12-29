import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SutraPortalResponse } from './sutraPortalSchema';

const {
  getFedToLocalSutraPortalDetails,
  createFedToLocalSutraPortalData,
  getFedToLocalSutraPortalListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.sutraPortal;

export const useFedToLocalSutraPortalDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalSutraPortalDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<SutraPortalResponse>(getFedToLocalSutraPortalDetails, {
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

export const useFedToLocalSutraPortalImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalSutraPortalData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalSutraPortalDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalSutraPortalListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalSutraPortalListCSV));
};
