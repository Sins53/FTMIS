import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CompleteVaccinationResponse } from './completeVaccinationSchema';

const {
  getFedToLocalCompleteVaccinationDetails,
  createFedToLocalCompleteVaccinationData,
  getFedToLocalCompleteVaccinationListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.completeVaccination;

export const useFedToLocalCompleteVaccinationDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalCompleteVaccinationDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<CompleteVaccinationResponse>(getFedToLocalCompleteVaccinationDetails, {
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

export const useFedToLocalCompleteVaccinationImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalCompleteVaccinationData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalCompleteVaccinationDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalCompleteVaccinationListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalCompleteVaccinationListCSV));
};
