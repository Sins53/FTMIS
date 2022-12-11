import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ToiletDetailsDataResponse, ToiletInitialValueProps } from './toiletSchema';

const { getToiletDetails, createToiletData } = apiList.equalizationGrant.formulaBased.toilet;

export const useToiletDetailsData = () =>
  useQuery(
    [getToiletDetails.queryKeyName],
    () => performApiAction<ToiletDetailsDataResponse>(getToiletDetails),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
export const useToiletDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: ToiletInitialValueProps) => {
      return performApiAction(createToiletData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getToiletDetails.queryKeyName]);
      }
    }
  );
};
