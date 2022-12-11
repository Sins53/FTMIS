import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  mofReportingDetailsDataResponse,
  ReportingToMofInitialValueProps
} from './reportingToMofSchema';

const { getReportingToMofDetails, createReportingToMofData } =
  apiList.equalizationGrant.performanceBased.reportingToMof;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useReportingToMofDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getReportingToMofDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<mofReportingDetailsDataResponse>(getReportingToMofDetails, {
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
export const useReportingToMofDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: ReportingToMofInitialValueProps) => {
      return performApiAction(createReportingToMofData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getReportingToMofDetails.queryKeyName]);
      }
    }
  );
};
