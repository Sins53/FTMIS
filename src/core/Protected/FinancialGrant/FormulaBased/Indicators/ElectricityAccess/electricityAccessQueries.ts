import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ElectricityAccessDetailsDataResponse,
  ElectricityAccessInitialValueProps
} from './electricityAccessSchema';

const { getElectricityAccessDetails, createElectricityAccessData } =
  apiList.equalizationGrant.formulaBased.electricityAccess;

export const useElectricityAccessDetailsData = () =>
  useQuery(
    [getElectricityAccessDetails.queryKeyName],
    () => performApiAction<ElectricityAccessDetailsDataResponse>(getElectricityAccessDetails),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
export const useElectricityAccessDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: ElectricityAccessInitialValueProps) => {
      return performApiAction(createElectricityAccessData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getElectricityAccessDetails.queryKeyName]);
      }
    }
  );
};
