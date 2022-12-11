import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  FiscalYearParams,
  FiscalYearResponse,
  FiscalYearResponseData,
  ToggleFiscalYearData
} from './fiscalYearSchema';

const {
  getAllFiscalYearData,
  createFiscalYearItem,
  editFiscalYearItem,
  deleteFiscalYearItem,
  toggleFiscalYearStatus
} = apiList.masterData.fiscalYear;

export const useFiscalYearData = ({
  page_size = '',
  page = '',
  search = '',
  escape_pg
}: FiscalYearParams) =>
  useQuery(
    [getAllFiscalYearData.queryKeyName, page, page_size, search, escape_pg],
    () =>
      performApiAction<FiscalYearResponse>(getAllFiscalYearData, {
        params: {
          ...removeEmptyValueFromObject({
            page_size,
            page,
            search,
            escape_pg
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

export const useFiscalYearCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: FiscalYearResponseData) => {
      if (isEditable && requestData.id) {
        return performApiAction(editFiscalYearItem, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(createFiscalYearItem, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllFiscalYearData.queryKeyName]);
      }
    }
  );
};

export const useDeleteFiscalYear = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      performApiAction(deleteFiscalYearItem, {
        pathVariables: { id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getAllFiscalYearData.queryKeyName);
      }
    }
  );
};

export const useToggleFiscalYearStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: ToggleFiscalYearData) => {
      return performApiAction(toggleFiscalYearStatus, {
        requestData,
        pathVariables: { id: requestData.id }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllFiscalYearData.queryKeyName]);
      }
    }
  );
};
