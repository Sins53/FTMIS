import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ComplianceDetailsDataResponse, ComplianceInitialValueProps } from './complianceSchema';

const { getComplianceDetails, createComplianceData } =
  apiList.equalizationGrant.performanceBased.compliance;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useComplianceDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getComplianceDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<ComplianceDetailsDataResponse>(getComplianceDetails, {
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
export const useComplianceDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: ComplianceInitialValueProps) => {
      return performApiAction(createComplianceData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getComplianceDetails.queryKeyName]);
      }
    }
  );
};
