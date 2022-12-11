import performApiAction, { CustomResponse } from '@/helper/default-action';
import { userManagementPath } from '@/routes/protected/userManagement';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  InternalUserData,
  InternalUserProvinceBranchParams,
  InternalUserResponseData
} from './internalUserSchema';

const {
  addInternalUserRegistration,
  getInternalUserRegistrationList,
  getInternalUserRegistrationById,
  editInternalUserRegistrationById,
  deleteInternalUserRegistrationById,
  editInternalUserProfile,
  resetInternalUserPassword,
  getInternalUserProvinceBranchList
} = apiList.userRegistration.internalUserRegistration;
const { getAllInternalUser } = apiList.userLists;

const { getUserDetail } = apiList.userManagement.userDetail;
export const useInternalUserData = () =>
  useQuery(
    [getInternalUserRegistrationList.queryKeyName],
    () => performApiAction<InternalUserResponseData>(getInternalUserRegistrationList),
    {
      select: (data) => {
        return data.data;
      },
      staleTime: 0
    }
  );

export const useInternalUserCreator = (shouldAddNew: boolean) =>
  // isEditable?: boolean
  {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(
      (requestData: InternalUserData) => {
        if (requestData.id) {
          return performApiAction(editInternalUserRegistrationById, {
            requestData,
            pathVariables: { id: requestData.id },
            enableSuccessToast: true
          });
        } else {
          return performApiAction(addInternalUserRegistration, {
            requestData
          });
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllInternalUser.queryKeyName]); // invalidating cache query and refetching all post
          if (!shouldAddNew) {
            navigate(userManagementPath.internalUser);
          }
        }
      }
    );
  };

export const useInternalUserEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: InternalUserData) =>
      performApiAction(editInternalUserProfile, {
        requestData
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getUserDetail.queryKeyName);
        navigate(userManagementPath.profileSettings);
      }
    }
  );
};

export const useGetInternalUserById = (id?: number) =>
  useQuery(
    [getInternalUserRegistrationById.queryKeyName, id],
    () =>
      id
        ? performApiAction<CustomResponse<InternalUserResponseData>>(
            getInternalUserRegistrationById,
            {
              pathVariables: { id }
            }
          )
        : null,
    {
      select: (data) => {
        return data?.data;
      },
      // enabled: !!id,
      staleTime: 0
    }
  );

export const useDeleteInternalUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteInternalUserRegistrationById, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllInternalUser.queryKeyName);
      }
    }
  );
};

export const useResetInternalUserPasswordData = () => {
  return useMutation((userId: string | number) =>
    performApiAction(resetInternalUserPassword, {
      pathVariables: { userId }
    })
  );
};

export const useInternalUserProvinceBranchList = ({
  data,
  province_id = undefined
}: InternalUserProvinceBranchParams) =>
  useQuery(
    [getInternalUserProvinceBranchList.queryKeyName, data, province_id],
    () =>
      performApiAction<any>(getInternalUserProvinceBranchList, {
        params: {
          ...removeEmptyValueFromObject({
            data,
            province_id
          })
        }
      }),
    {
      select: (data) => {
        return data.data?.data;
      },
      staleTime: 0
    }
  );
