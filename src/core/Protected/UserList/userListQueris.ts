import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery } from 'react-query';
import { CommonIndividualDataResponse } from './CommonProfileComponents/CommonIndividualSchema';
import { CommonInstitutionDataResponse } from './CommonProfileComponents/CommonInstitutionSchema';
import {
  CustomerDataParams,
  CustomerIndividualDataResponse,
  FirmDataResponse,
  InternalUserDataResponse
} from './userListSchema';

const {
  getAllIndividualCustomer,
  getAllFirmCustomer,
  getAllInternalUser,
  getIndividualCustomerById,
  getIndividualUserListCVS,
  getInstitutionalUserListCVS
} = apiList.userLists;
const { getInstitutionalUserById } = apiList.userProfile.institutionalUsers;

const useIndividualCustomerListData = ({
  page_size = '',
  page = '',
  sort = '',
  escape_pg,
  customer_type = 'individual',
  search
}: CustomerDataParams) =>
  useQuery(
    [getAllIndividualCustomer.queryKeyName, page, page_size, customer_type, search],
    () =>
      performApiAction<CustomerIndividualDataResponse>(getAllIndividualCustomer, {
        params: {
          ...removeEmptyValueFromObject({
            page_size,
            page,
            sort,
            escape_pg,
            customer_type,
            search
          })
        }
      }),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );
const useFirmCustomerListData = ({
  page_size = '',
  page = '',
  sort = '',
  escape_pg,
  customer_type = 'institution',
  search
}: CustomerDataParams) =>
  useQuery(
    [getAllFirmCustomer.queryKeyName, page, page_size, customer_type, search],
    () =>
      performApiAction<FirmDataResponse>(getAllFirmCustomer, {
        params: {
          ...removeEmptyValueFromObject({
            page_size,
            page,
            sort,
            escape_pg,
            customer_type,
            search
          })
        }
      }),
    {
      select: (data) => {
        console.log(data);
        return data.data;
      },
      keepPreviousData: true
    }
  );

const useInternalUserData = ({
  page_size = '',
  page = '',
  sort = '',
  escape_pg,
  search
}: PaginatedParams) =>
  useQuery(
    [getAllInternalUser.queryKeyName, page, page_size, search],
    () =>
      performApiAction<InternalUserDataResponse>(getAllInternalUser, {
        params: {
          ...removeEmptyValueFromObject({
            page_size,
            page,
            sort,
            escape_pg,
            search
          })
        }
      }),
    {
      select: (data) => {
        return data.data;
      },
      keepPreviousData: true
    }
  );

const useIndividualCustomerById = (id: Primitive | undefined) =>
  useQuery(
    [getIndividualCustomerById.queryKeyName, id],
    () =>
      performApiAction<CommonIndividualDataResponse>(getIndividualCustomerById, {
        pathVariables: { id: id ? id : '' }
      }),
    {
      select: (data) => {
        return data?.data?.data;
      },
      enabled: !!id
    }
  );
const useInstitutionalCustomerById = (id: Primitive | undefined) =>
  useQuery(
    [getInstitutionalUserById.queryKeyName, id],
    () =>
      performApiAction<CommonInstitutionDataResponse>(getInstitutionalUserById, {
        pathVariables: { id: id ? id : '' }
      }),
    {
      select: (data) => {
        return data?.data?.data;
      },
      enabled: !!id
    }
  );

const useIndividualUserListCVS = () => {
  return useMutation(() => performApiAction<any>(getIndividualUserListCVS));
};

const useInstitutionalUserListCVS = () => {
  return useMutation(() => performApiAction<any>(getInstitutionalUserListCVS));
};

export {
  useIndividualCustomerListData,
  useFirmCustomerListData,
  useInternalUserData,
  useIndividualCustomerById,
  useInstitutionalCustomerById,
  useIndividualUserListCVS,
  useInstitutionalUserListCVS
};
