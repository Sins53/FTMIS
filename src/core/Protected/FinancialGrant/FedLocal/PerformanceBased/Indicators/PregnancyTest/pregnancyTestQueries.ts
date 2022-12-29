import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PregnancyTestResponse } from './pregnancyTestSchema';

const {
  getFedToLocalPregnancyTestDetails,
  createFedToLocalPregnancyTestData,
  getFedToLocalPregnancyTestListCSV
} = apiList.equalizationGrant.fedToLocal.performanceBased.pregnancyTest;

export const useFedToLocalPregnancyTestDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalPregnancyTestDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<PregnancyTestResponse>(getFedToLocalPregnancyTestDetails, {
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

export const useFedToLocalPregnancyTestImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalPregnancyTestData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalPregnancyTestDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalPregnancyTestListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalPregnancyTestListCSV));
};
