import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BerujuDetailsDataResponse, BerujuInitialValueProps } from './BerujuSchema';

const { getBerujuDetails, createBerujuData } = apiList.equalizationGrant.performanceBased.beruju;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useBerujuDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getBerujuDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<BerujuDetailsDataResponse>(getBerujuDetails, {
        params: {
          ...removeEmptyValueFromObject({
            fiscal_year
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
export const useBerujuDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: BerujuInitialValueProps) => {
      return performApiAction(createBerujuData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getBerujuDetails.queryKeyName]);
      }
    }
  );
};
