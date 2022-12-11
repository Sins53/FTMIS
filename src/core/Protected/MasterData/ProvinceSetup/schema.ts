import { CommonArrayResponseTypes, CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
export interface ProvinceData {
  name_en: string;
  name_np: string;
  totalRecords: number;
  province_number: number | string;
}
//const G = generateLabelValueArray;
export interface ProvinceResponseData {
  id?: number;
  name_en: string;
  name_np: string;
  is_deleted?: boolean;
  province_number?: number | string;
}
export interface provinceInitialValueProp {
  name_en: string;
  name_np: string;
  province_number: number | string;
}
export const provinceInitialValue: provinceInitialValueProp = {
  name_en: '',
  name_np: '',
  province_number: ''
};

export interface RequestData {
  id?: number;
  name_en: string;
  name_np: string;
  province_number?: number | undefined | string;
}

export type ProvinceDataResponse = CommonArrayResponseTypes<ProvinceData[]>;
export const provinceValidationSchema = Yup.object({
  name_en: Yup.string()
    .required('common:validation.require_province_en')
    .trim()
    .max(255, 'fields:nameEn.maxLengthValidation')
    .min(2, 'fields:nameEn.minLengthValidation'),
  name_np: Yup.string()
    .required('common:validation.require_province_np')
    .trim()
    .max(255, 'fields:nameNp.maxLengthValidation')
    .min(2, 'fields:nameNp.minLengthValidation'),
  province_number: Yup.number()
    .required('fields:province_num.requiredValidation')
    .min(0, 'common:validation.positiveNumber')
});

interface FiscalProvince {
  id: number;
  name_en: string;
  name_np: string;
}

interface FiscalYear {
  id: number;
  name: string;
}
interface FiscalProvinceDetails {
  id: number | string;
  population: number;
  area: number;
  road: number;
  mdi: number;
  hdi: number;
  it_access: number;
  fiscal_year: FiscalYear;
}
export interface FiscalProvinceData {
  province: FiscalProvince;
  details: FiscalProvinceDetails | null;
}
export type FiscalProvinceDataResponse = CustomResponse<FiscalProvinceData[]>;

export interface FiscalProvinceInitialValueProp {
  id?: number | string;
  fiscal_year: string | number;
  province: string | number;
  population: string | number;
  area: string | number;
  road: string | number;
  mdi: string | number;
  hdi: string | number;
  it_access: string | number;
  name: string | number;
}
export const FiscalProvinceInitialValue: FiscalProvinceInitialValueProp = {
  fiscal_year: '',
  province: '',
  population: '',
  area: '',
  road: '',
  mdi: '',
  hdi: '',
  it_access: '',
  name: ''
};

export const FiscalProvinceValidationSchema = Yup.object({
  population: Yup.number().required('req').min(0, 'Must be Positive'),
  area: Yup.number().required('req').min(0, 'Must be Positive'),
  road: Yup.number().required('req').min(0, 'Must be Positive'),
  mdi: Yup.number().required('req').min(0, 'Must be Positive'),
  hdi: Yup.number().required('req').min(0, 'Must be Positive'),
  it_access: Yup.number().required('req').min(0, 'Must be Positive')
});
