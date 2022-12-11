import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MinimumGrantDetailsResponse } from './minimumGrantSchema';

const {
  getMinimalGrant,
  updateMinimalGrant,
  createMinimalGrant,
  getProvinceMinimalGrantData,
  calculateProvinceMinimalGrantData
} = apiList.equalizationGrant;

interface FiscalYearParam {
  fiscal_year?: string | number;
}

//Minimum Grant Detail Table API
export const useEqualizationMinimumGrantDetails = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getProvinceMinimalGrantData.queryKeyName, fiscal_year],
    () =>
      performApiAction<MinimumGrantDetailsResponse>(getProvinceMinimalGrantData, {
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

//Calculate MinimumGrant for  Created Equalization MinimumGrant
export const useCalculateEqualizationMinimumGrantDetail = ({ fiscal_year }: FiscalYearParam) => {
  const queryClient = useQueryClient();
  return useQuery(
    [calculateProvinceMinimalGrantData.queryKeyName, fiscal_year],
    () =>
      performApiAction<any>(calculateProvinceMinimalGrantData, {
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
      keepPreviousData: true,
      enabled: false,
      onSuccess: () => {
        queryClient.invalidateQueries([getProvinceMinimalGrantData.queryKeyName]);
      }
    }
  );
};

// Equalization minimumGrant CRUD
export const useEqualizationMinimumGrantData = ({ fiscal_year }: FiscalYearParam) =>
  useQuery(
    [getMinimalGrant.queryKeyName, fiscal_year],
    () =>
      performApiAction<any>(getMinimalGrant, {
        params: {
          ...removeEmptyValueFromObject({
            fiscal_year
          })
        }
      }),
    {
      select: (data) => {
        return data.data?.data[0];
      },
      keepPreviousData: true
    }
  );
export const useEqualizationMinimumGrantCreator = (isEditable?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: any) => {
      if (isEditable && requestData.id) {
        return performApiAction(updateMinimalGrant, {
          requestData,
          pathVariables: { id: requestData.id }
        });
      } else {
        return performApiAction(createMinimalGrant, {
          requestData
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getMinimalGrant.queryKeyName]);
      }
    }
  );
};
