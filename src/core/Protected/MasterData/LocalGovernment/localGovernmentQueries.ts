import performApiAction, { CommonArrayResponseTypes } from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useQuery } from 'react-query';
import { FiscalYearParams } from '../FiscalYear/fiscalYearSchema';
import { LocalGovernmentResponse } from './localGovernmentSchema';

const { getAllLocalGovernmentData } = apiList.masterData.localGovernment;

export const useLocalGovernmentData = ({ page_size = '', page = '' }: FiscalYearParams) =>
  useQuery(
    [getAllLocalGovernmentData.queryKeyName, page, page_size],
    () =>
      performApiAction<CommonArrayResponseTypes<LocalGovernmentResponse[]>>(
        getAllLocalGovernmentData,
        {
          params: {
            ...removeEmptyValueFromObject({
              page_size,
              page
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
