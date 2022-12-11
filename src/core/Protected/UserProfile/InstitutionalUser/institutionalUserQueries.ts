import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CommonInstitutionDataResponse } from '../../UserList/CommonProfileComponents/CommonInstitutionSchema';
import { InstitutionalDataByIdResponse, InstitutionalUserData } from './institutionalUserSchema';

const {
  editInstitutionalById,
  getInstitutionalUserFullDetail,
  getInstitutionalUserById,
  getCurrentInstitutionalUser,
  getCurrentInstitutionalUserForLoanJourney,
  getInstitutionalUserLoanFullDetail
} = apiList.userProfile.institutionalUsers;
const { getAllFirmCustomer } = apiList.userLists;
const useCurrentInstitutionalUser = (id?: number | string | undefined) => {
  return useQuery(
    getCurrentInstitutionalUser.queryKeyName,
    () =>
      id
        ? performApiAction<InstitutionalDataByIdResponse>(
            getCurrentInstitutionalUserForLoanJourney,
            {
              pathVariables: { id }
            }
          )
        : performApiAction<InstitutionalDataByIdResponse>(getCurrentInstitutionalUser),
    {
      // enabled: true,
      select: (data) => data?.data?.data,
      staleTime: 0
    }
  );
};

const useInstitutionalUserFullDetail = () => {
  console.log();
  return useQuery(
    [getInstitutionalUserFullDetail.queryKeyName],
    () => performApiAction<CommonInstitutionDataResponse>(getInstitutionalUserFullDetail),
    {
      // enabled: true,
      select: (data) => data?.data?.data,
      staleTime: 0
    }
  );
};

// const useInstitutionalUserLoanFullDetail = (id?: number | string | undefined) => {
//   console.log();
//   return useQuery(
//     [getInstitutionalUserLoanFullDetail.queryKeyName],
//     () => performApiAction<CommonInstitutionDataResponse>(getInstitutionalUserLoanFullDetail),
//     {
//       // enabled: true,
//       select: (data) => data?.data?.data,
//       staleTime: 0
//     }
//   );
// };
const useInstitutionalUserLoanFullDetail = (id: number | null) => {
  return useQuery(
    [getInstitutionalUserLoanFullDetail.queryKeyName, id],
    () =>
      id
        ? performApiAction<CommonInstitutionDataResponse>(getInstitutionalUserLoanFullDetail, {
            pathVariables: { id }
          })
        : null,
    {
      enabled: !!id,
      select: (data) => data?.data?.data
    }
  );
};
const useInstitutionalUserById = (id: number | null) => {
  return useQuery(
    getInstitutionalUserById.queryKeyName,
    () =>
      id
        ? performApiAction<InstitutionalDataByIdResponse>(getInstitutionalUserById, {
            pathVariables: { id }
          })
        : null,
    {
      enabled: !!id,
      select: (data) => data?.data?.data
    }
  );
};

const useUpdateInstituionalUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: InstitutionalUserData) => {
      const pathVariables = requestData.id ? { id: requestData.id } : undefined;
      return performApiAction(editInstitutionalById, { requestData, pathVariables });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllFirmCustomer.queryKeyName);
      }
    }
  );
};

export {
  useUpdateInstituionalUser,
  useInstitutionalUserFullDetail,
  useInstitutionalUserById,
  useCurrentInstitutionalUser,
  useInstitutionalUserLoanFullDetail
};
