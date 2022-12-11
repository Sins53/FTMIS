import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  AssignHeadOfficeRequestData,
  AssignOfficeDataResponse,
  AssignProvinceOfficeRequestData
} from './schema';

const { assignHeadOffice, assignProvinceOffice, getOffices } = apiList.masterData.branches;

const useAssignOfficesData = () =>
  useQuery(
    [getOffices.queryKeyName],
    () => performApiAction<AssignOfficeDataResponse>(getOffices, {}),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );

const useAssignHeadOffice = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: AssignHeadOfficeRequestData) => {
      return performApiAction(assignHeadOffice, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getOffices.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

const useAssignProvinceOffice = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: AssignProvinceOfficeRequestData) => {
      return performApiAction(assignProvinceOffice, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getOffices.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export { useAssignOfficesData, useAssignHeadOffice, useAssignProvinceOffice };
