import { ArrayResponseTypes, CommonArrayResponseTypes } from '@/helper/default-action';
import { LOCALBODY_TYPE_ENUM } from '@/shared/enums/localbody-type';

export interface ProvinceData {
  id: number;
  name_en: string;
  name_np: string;
  province_number: number;
}

export interface ProvinceParams {
  page_size?: number | string;
  page?: number | string;
  escape_pg?: boolean;
}

export type ProvinceDataResponse = CommonArrayResponseTypes<ProvinceData[]>;

export interface DistrictData {
  id: number;
  name_en: string;
  name_np: string;
  province: number;
}
export interface DistrictParams {
  province?: number | string;
  page_size?: number | string;
  page?: number | string;
  escape_pg?: boolean;
}
export type DistrictDataResponse = ArrayResponseTypes<DistrictData[]>;

export interface LocalBodyData {
  id: number;
  name_en: string;
  name_np: string;
  district: number;
  localbody_code: number | string;
  localbody_type: number;
}
export interface LocalBodyParams {
  district?: number | string;
  localbody_type?: LOCALBODY_TYPE_ENUM;
  page_size?: number | string;
  page?: number | string;
  escape_pg?: boolean;
}
export type LocalBodyDataResponse = ArrayResponseTypes<LocalBodyData[]>;
