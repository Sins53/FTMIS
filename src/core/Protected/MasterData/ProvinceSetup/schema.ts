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
  sed_index: number;
  hdi: number;
  it_access: number;
  fiscal_year: FiscalYear;
  toilet_availability_index: number | string;
  drinking_water_index: number | string;
  expense_need: number | string;
  revenue_capacity: number | string;
  total_house_hold: number | string;
  household_with_electricity: number | string;
}
export interface FiscalProvinceData {
  province: FiscalProvince;
  details: FiscalProvinceDetails | null;
}
export type FiscalProvinceDataResponse = CustomResponse<FiscalProvinceData[]>;

export interface FiscalProvinceInitialValueProp {
  id?: number | string;
  province: string | number;
  population: string | number;
  area: string | number;
  road: string | number;
  sed_index: string | number;
  hdi: string | number;
  it_access: string | number;
  name: string | number;
  toilet_availability_index: number | string;
  drinking_water_index: number | string;
  expense_need: number | string;
  revenue_capacity: number | string;
  total_house_hold: number | string;
  household_with_electricity: number | string;
}
export const FiscalProvinceInitialValue: FiscalProvinceInitialValueProp = {
  province: '',
  population: '',
  area: '',
  road: '',
  sed_index: '',
  hdi: '',
  it_access: '',
  name: '',
  toilet_availability_index: '',
  drinking_water_index: '',
  expense_need: '',
  revenue_capacity: '',
  total_house_hold: '',
  household_with_electricity: ''
};

export const FiscalProvinceValidationSchema = Yup.object({
  population: Yup.number().required('Total population is required').min(0, 'Must be Positive'),
  area: Yup.number().required('Area is required').min(0, 'Must be Positive'),
  road: Yup.number().required('Road value is required').min(0, 'Must be Positive'),
  sed_index: Yup.number()
    .required('Socio-econoix disparity is required')
    .min(0, 'Must be Positive')
    .lessThan(1, 'Must be less than 1'),

  hdi: Yup.number()
    .required('HDI value is required')
    .min(0, 'Must be Positive')
    .lessThan(1, 'Must be less than 1'),
  it_access: Yup.number()
    .required('It Access is required')
    .min(0, 'Must be Positive')
    .lessThan(1, 'Must be less than 1'),
  toilet_availability_index: Yup.number()
    .required('Toilet Availability Index is required')
    .min(0, 'Must be Positive')
    .lessThan(1, 'Must be less than 1'),
  drinking_water_index: Yup.number()
    .required('Drinking Water Index is required')
    .min(0, 'Must be Positive')
    .lessThan(1, 'Must be less than 1'),

  expense_need: Yup.number().required('Expense Need is required').min(0, 'Must be Positive'),
  revenue_capacity: Yup.number()
    .required('Revenue Capacity is required')
    .min(0, 'Must be Positive'),
  total_house_hold: Yup.number().required('Total household is required').min(0, 'Must be Positive'),
  household_with_electricity: Yup.number()
    .required('Household with electricity is required')
    .min(0, 'Must be Positive')
});
