import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  CommonIndividualDataResponse,
  CommonIndividualDataWithAdditionalDocsResponse
} from '../../UserList/CommonProfileComponents/CommonIndividualSchema';
import { IndividualDataByIdResponse, IndividualUserData } from './individualUserSchema';

const {
  editIndividualById,
  getIndividualUserById,
  getCurrentIndividualUser,
  getCurrentIndividualUserByFormId,
  getIndividualUserFullDetail,
  getIndividualUserLoanFullDetail
} = apiList.userProfile.individualUsers;
const { getAllIndividualCustomer } = apiList.userLists;

const useCurrentIndividualUser = (id?: number | string) => {
  console.log();
  return useQuery(
    [getCurrentIndividualUser.queryKeyName, getCurrentIndividualUserByFormId.queryKeyName],
    () =>
      id
        ? performApiAction<IndividualDataByIdResponse>(getCurrentIndividualUserByFormId, {
            pathVariables: { formId: id }
          })
        : performApiAction<IndividualDataByIdResponse>(getCurrentIndividualUser),
    {
      // enabled: true,
      select: (data) => data?.data?.data,
      staleTime: 0
    }
  );
};
const useIndividualUserFullDetail = () => {
  console.log();
  return useQuery(
    [getIndividualUserFullDetail.queryKeyName],
    () =>
      performApiAction<CommonIndividualDataWithAdditionalDocsResponse>(getIndividualUserFullDetail),
    {
      // enabled: true,
      select: (data) => data?.data?.data,
      staleTime: 0
    }
  );
};

const useIndividualUserLoanFullDetail = (id: number | null) => {
  return useQuery(
    [getIndividualUserLoanFullDetail.queryKeyName, id],
    () =>
      id
        ? performApiAction<CommonIndividualDataResponse>(getIndividualUserLoanFullDetail, {
            pathVariables: { id }
          })
        : null,
    {
      enabled: !!id,
      select: (data) => data?.data?.data
    }
  );
};

const useIndividualUserById = (id: number | null) => {
  return useQuery(
    getIndividualUserById.queryKeyName,
    () =>
      id
        ? performApiAction<IndividualDataByIdResponse>(getIndividualUserById, {
            pathVariables: { id }
          })
        : null,
    {
      enabled: !!id,
      select: (data) => data?.data?.data
    }
  );
};

const useUpdateIndividualUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: IndividualUserData) => {
      const pathVariables = requestData.id ? { id: requestData.id } : undefined;
      return performApiAction(editIndividualById, { requestData, pathVariables });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllIndividualCustomer.queryKeyName);
      }
    }
  );
};

export {
  useUpdateIndividualUser,
  useIndividualUserById,
  useCurrentIndividualUser,
  useIndividualUserFullDetail,
  useIndividualUserLoanFullDetail
};
