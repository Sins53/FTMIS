import performApiAction from '@/helper/default-action';
import { apiList } from '@/store/apiDetails';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  FedToLocalMinimumGrantDataResponse,
  MinGrantInitialValueProps,
  MinimumGrantPercentResponse,
  PopulationRangeResponse
} from './minimumGrantschema';

const {
  getFedToLocalMinimalGrant,
  createFedToLocalMinimalGrant,
  getFedToLocalMinimalGrantPercent
  // getFedToLocalMinimalResultData
} = apiList.equalizationGrant.fedToLocal.minimum;
const { getPopulationRangeList } = apiList.equalizationGrant.fedToLocal;

// Minimum Grant Result Detail Table API
// export const useFedToLocalMinimumGrantResultDetails = (fiscal_year?: string | number) =>
//   useQuery(
//     [getFedToLocalMinimalResultData.queryKeyName, fiscal_year],
//     () =>
//       performApiAction<any>(getFedToLocalMinimalResultData, {
//         params: {
//           ...removeEmptyValueFromObject({
//             fiscal_year
//           })
//         }
//       }),
//     {
//       select: (data) => {
//         return data.data?.data;
//       },
//       keepPreviousData: true
//     }
//   );

//Calculate MinimumGrant for  Created Equalization MinimumGrant
// export const useCalculateEqualizationMinimumGrantDetail = () => {
//   const queryClient = useQueryClient();
//   return useQuery(
//     [calculateProvinceMinimalGrantData.queryKeyName],
//     () => performApiAction<any>(calculateProvinceMinimalGrantData),
//     {
//       select: (data) => {
//         return data.data?.data;
//       },
//       keepPreviousData: true,
//       enabled: false,
//       onSuccess: () => {
//         queryClient.invalidateQueries([getProvinceMinimalGrantData.queryKeyName]);
//       }
//     }
//   );
// };

// Equalization minimumGrant CRUD
export const useFedToLocalMinimumGrantData = () =>
  useQuery(
    [getFedToLocalMinimalGrant.queryKeyName],
    () => performApiAction<FedToLocalMinimumGrantDataResponse>(getFedToLocalMinimalGrant),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
// export const useFedToLocalMinimumGrantCreator = (isEditable?: boolean) => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     (requestData: any) => {
//       if (isEditable && requestData.id) {
//         return performApiAction(updateFedToLocalMinimalGrant, {
//           requestData,
//           pathVariables: { id: requestData.id }
//         });
//       } else {
//         return performApiAction(createFedToLocalMinimalGrant, {
//           requestData
//         });
//       }
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries([getFedToLocalMinimalGrant.queryKeyName]);
//       }
//     }
//   );
// };
export const useFedToLocalMinimumGrantCreator = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (requestData: MinGrantInitialValueProps) => {
      return performApiAction(createFedToLocalMinimalGrant, {
        requestData
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getFedToLocalMinimalGrant.queryKeyName]);
        queryClient.invalidateQueries([getFedToLocalMinimalGrantPercent.queryKeyName]);
      }
    }
  );
};
export const usePopulationRangeList = ({ escape_pg }: PaginatedParams) =>
  useQuery(
    [getPopulationRangeList.queryKeyName, escape_pg],
    () =>
      performApiAction<PopulationRangeResponse>(getPopulationRangeList, {
        params: {
          ...removeEmptyValueFromObject({
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

export const useFedToLocalMinimumGrantPercentData = () =>
  useQuery(
    [getFedToLocalMinimalGrantPercent.queryKeyName],
    () => performApiAction<MinimumGrantPercentResponse>(getFedToLocalMinimalGrantPercent),
    {
      select: (data) => {
        return data.data?.data;
      },
      keepPreviousData: true
    }
  );
