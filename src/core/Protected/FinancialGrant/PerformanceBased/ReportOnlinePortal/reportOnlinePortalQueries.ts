import {
  onlinePortalDetailsDataResponse,
  ReportOnlinePortalInitialValues
} from './reportOnlinePortalSchema';
import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const { createReportOnlinePortalData, getReportOnlinePortalDetails } =
  apiList.equalizationGrant.performanceBased.reportOnlinePortal;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useReportOnlinePortalData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getReportOnlinePortalDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<onlinePortalDetailsDataResponse>(getReportOnlinePortalDetails, {
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
export const useReportOnlinePortalCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: typeof ReportOnlinePortalInitialValues) => {
      return performApiAction(createReportOnlinePortalData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getReportOnlinePortalDetails.queryKeyName]);
      }
    }
  );
};
