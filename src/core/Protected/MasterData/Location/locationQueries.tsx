import { apiList } from '@/store/apiDetails';
import { useQuery } from 'react-query';
import performApiAction from '@/helper/default-action';
import {
  DistrictDataResponse,
  DistrictParams,
  LocalBodyDataResponse,
  LocalBodyParams,
  ProvinceDataResponse
} from './schema';
import { removeEmptyValueFromObject } from '@/utils/removeEmptyValueObject';
import { LOCALBODY_TYPE_ENUM } from '@/shared/enums/localbody-type';

const { getAllProvince, getAllDistrict, getAllLocalBody } = apiList.masterData.location;

//Remove ProvinceDataParams if no CRUD in Province
interface ProvinceDataParams extends PaginatedParams {
  view?: string;
}

export const useProvinceData = ({
  page_size = '',
  page = '',
  escape_pg,
  search,
  view
}: ProvinceDataParams) =>
  useQuery(
    [getAllProvince.queryKeyName, page, page_size, search, view],
    () =>
      performApiAction<ProvinceDataResponse>(getAllProvince, {
        params: {
          ...removeEmptyValueFromObject({
            page_size,
            page,
            escape_pg,
            search,
            view
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

export const useDistrictData = ({
  page_size = '',
  page = '',
  province = '',
  escape_pg
}: DistrictParams) =>
  useQuery(
    [getAllDistrict.queryKeyName, province],
    () =>
      performApiAction<DistrictDataResponse>(getAllDistrict, {
        params: {
          ...removeEmptyValueFromObject({
            province,
            page_size,
            page,
            escape_pg
          })
        }
      }),
    {
      select: (data) => {
        return data.data?.data;
      }
    }
  );

export const useLocalBodyData = ({
  page_size = '',
  page = '',
  district = '',
  localbody_type = LOCALBODY_TYPE_ENUM.none,
  escape_pg
}: LocalBodyParams) =>
  useQuery(
    [getAllLocalBody.queryKeyName, district, localbody_type],
    () =>
      performApiAction<LocalBodyDataResponse>(getAllLocalBody, {
        params: {
          ...removeEmptyValueFromObject({
            district,
            localbody_type,
            page_size,
            page,
            escape_pg
          })
        }
      }),
    {
      select: (data) => {
        return data.data?.data;
      }
    }
  );
