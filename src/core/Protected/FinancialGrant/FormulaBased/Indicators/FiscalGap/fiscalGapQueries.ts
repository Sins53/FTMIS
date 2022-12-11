import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FiscalGapDetailsDataResponse, FiscalGapInitialValueProps } from './fiscalGapSchema';

const { getFiscalGapDetails, createFiscalGapData } =
  apiList.equalizationGrant.formulaBased.fiscalGap;

export const useFiscalGapDetailsData = () =>
  useQuery(
    [getFiscalGapDetails.queryKeyName],
    () => performApiAction<FiscalGapDetailsDataResponse>(getFiscalGapDetails),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
export const useFiscalGapDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: FiscalGapInitialValueProps) => {
      return performApiAction(createFiscalGapData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getFiscalGapDetails.queryKeyName]);
      }
    }
  );
};
