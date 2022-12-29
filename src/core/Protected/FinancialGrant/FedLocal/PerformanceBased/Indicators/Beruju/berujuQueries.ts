import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BerujuResponse } from './berujuSchema';

const { getFedToLocalBerujuDetails, createFedToLocalBerujuData, getFedToLocalBerujuListCSV } =
  apiList.equalizationGrant.fedToLocal.performanceBased.beruju;

export const useFedToLocalBerujuDetail = ({
  page_size = '',
  page = '',
  search = ''
}: PaginatedParams) =>
  useQuery(
    [getFedToLocalBerujuDetails.queryKeyName, page_size, page, search],
    () =>
      performApiAction<BerujuResponse>(getFedToLocalBerujuDetails, {
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

export const useFedToLocalBerujuImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(createFedToLocalBerujuData, {
        requestData,
        enableSuccessToast: true
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFedToLocalBerujuDetails.queryKeyName);
      }
    }
  );
};
export const useFedToLocalBerujuListCVS = () => {
  return useMutation(() => performApiAction<any>(getFedToLocalBerujuListCSV));
};
