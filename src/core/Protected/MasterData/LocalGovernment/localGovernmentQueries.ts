import performApiAction, { CommonArrayResponseTypes } from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FiscalYearParams } from '../FiscalYear/fiscalYearSchema';
import { LocalGovernmentResponse } from './localGovernmentSchema';

const {
  getAllLocalGovernmentData,
  getFiscalYearLocalGovernmentData,
  editFiscalYearLocalGovernmentData,
  addFiscalYearLocalGovernmentData,
  localGovernmentBulkImport,
  getLocalGovernmentListCSV
} = apiList.masterData.localGovernment;

interface LocalGovernmentDataParams extends PaginatedParams {
  fiscal_year?: string | number | null;
  province?: number | null;
}

export const useLocalGovernmentData = ({
  page_size = '',
  page = '',
  search = ''
}: FiscalYearParams) =>
  useQuery(
    [getAllLocalGovernmentData.queryKeyName, page, page_size, search],
    () =>
      performApiAction<CommonArrayResponseTypes<LocalGovernmentResponse[]>>(
        getAllLocalGovernmentData,
        {
          params: {
            ...removeEmptyValueFromObject({
              page_size,
              page,
              search
            })
          }
        }
      ),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );

export const useFiscalLocalGovernmentData = ({
  page_size = '',
  page = '',
  escape_pg,
  search,
  fiscal_year,
  province
}: LocalGovernmentDataParams) =>
  useQuery(
    [
      getFiscalYearLocalGovernmentData.queryKeyName,
      page,
      page_size,
      escape_pg,
      search,
      fiscal_year,
      province
    ],
    () =>
      performApiAction<any>(getFiscalYearLocalGovernmentData, {
        params: {
          ...removeEmptyValueFromObject({
            page,
            page_size,
            escape_pg,
            search,
            fiscal_year,
            province
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

export const useFiscalLocalGovernmentCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: any) => {
      if (isEditable && requestData.id) {
        return performApiAction(editFiscalYearLocalGovernmentData, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(addFiscalYearLocalGovernmentData, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getFiscalYearLocalGovernmentData.queryKeyName]);
      }
    }
  );
};

export const useFiscalLocalGovernmentImport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: { file: File }) =>
      performApiAction(localGovernmentBulkImport, { requestData, enableSuccessToast: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFiscalYearLocalGovernmentData.queryKeyName);
      }
    }
  );
};
export const useFiscalLocalGovernmentListCVS = () => {
  return useMutation(() => performApiAction<any>(getLocalGovernmentListCSV));
};
