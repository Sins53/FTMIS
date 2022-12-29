import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { StudentConsistencyRateResponse } from './studentConsistencyRateSchema';

const {
  getFedToLocalStudentConsistencyRateDetails,
  createFedToLocalStudentConsistencyRateData,
  getFedToLocalStudentConsistencyRateListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.studentConsistencyRate;

export const useFedToLocalStudentConsistencyRateDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalStudentConsistencyRateDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<StudentConsistencyRateResponse>(getFedToLocalStudentConsistencyRateDetails, {
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

export const useFedToLocalStudentConsistencyRateImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalStudentConsistencyRateData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalStudentConsistencyRateDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalStudentConsistencyRateListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalStudentConsistencyRateListCSV));
};
