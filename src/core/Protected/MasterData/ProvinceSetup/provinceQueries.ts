import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
//import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  FiscalProvinceDataResponse,
  FiscalProvinceInitialValueProp,
  ProvinceResponseData
} from './schema';

const {
  addNewProvince,
  editProvinceById,
  deleteProvinceById,
  provinceBulkImport,
  getFiscalYearProvinceData,
  addFiscalYearProvinceData,
  editFiscalYearProvinceData
} = apiList.masterData.province;
const { getAllProvince } = apiList.masterData.location;

interface FiscalProvinceDataParams {
  fiscal_year?: string | number;
}

export const useProvinceCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: ProvinceResponseData) => {
      if (isEditable && requestData.id) {
        return performApiAction(editProvinceById, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(addNewProvince, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllProvince.queryKeyName]); // invalidating cache query and refetching all post
      }
    }
  );
};

export const useDeleteProvince = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteProvinceById, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllProvince.queryKeyName);
      }
    }
  );
};

export const useProvinceImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(provinceBulkImport, { requestData, enableSuccessToast: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllProvince.queryKeyName);
      }
    }
  );
};

export const useFiscalProvinceData = ({ fiscal_year }: FiscalProvinceDataParams) =>
  useQuery(
    [getFiscalYearProvinceData.queryKeyName, fiscal_year],
    () =>
      performApiAction<FiscalProvinceDataResponse>(getFiscalYearProvinceData, {
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

export const useFiscalProvinceCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: FiscalProvinceInitialValueProp) => {
      if (isEditable && requestData.id) {
        return performApiAction(editFiscalYearProvinceData, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(addFiscalYearProvinceData, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getFiscalYearProvinceData.queryKeyName]);
      }
    }
  );
};
