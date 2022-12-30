import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { HealthInstituteResponse } from './healthInstituteSchema';

const {
  getFedToLocalHealthInstituteDetails,
  createFedToLocalHealthInstituteData,
  getFedToLocalHealthInstituteListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.healthInstitute;

export const useFedToLocalHealthInstituteDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalHealthInstituteDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<HealthInstituteResponse>(getFedToLocalHealthInstituteDetails, {
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

export const useFedToLocalHealthInstituteImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalHealthInstituteData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalHealthInstituteDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalHealthInstituteListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalHealthInstituteListCSV));
};
