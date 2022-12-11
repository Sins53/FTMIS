import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { VehicleTaxDetailsDataResponse, VehicleTaxInitialValueProps } from './vehicleSchema';

const { getVehicleTaxDetails, createVehicleTaxData } =
  apiList.equalizationGrant.performanceBased.vehicleTax;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

export const useVehicleTaxDetailsData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getVehicleTaxDetails.queryKeyName, fiscal_year],
    () =>
      performApiAction<VehicleTaxDetailsDataResponse>(getVehicleTaxDetails, {
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
export const useVehicleTaxDataCreator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: VehicleTaxInitialValueProps) => {
      return performApiAction(createVehicleTaxData, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getVehicleTaxDetails.queryKeyName]);
      }
    }
  );
};
