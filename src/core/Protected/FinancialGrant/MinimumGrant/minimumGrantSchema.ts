import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';

export interface minimumGrantInitialValueProp {
  total: string | number;
  id?: string | number;
  percent: string | number;
  amount: string | number;
  area_percent: string | number;
  population_percent: string | number;
  fiscal_year?: string | number;
  budget?: string | number;
}

export const minimumGrantInitialValue: minimumGrantInitialValueProp = {
  total: '',
  percent: '',
  amount: '',
  area_percent: '',
  population_percent: '',
  budget: ''
};

export const minimumGrantValidationSchema = Yup.object({
  percent: Yup.number()
    .required('Minimum Grant Percentage is required')
    .min(0, 'Must be positive')
    .max(100, 'Must be less than 100'),
  area_percent: Yup.number()
    .required('Area Percentage is required')
    .min(0, 'Must be positive')
    .max(100, 'Must be less than 100'),
  population_percent: Yup.number()
    .required('Population percentage is required')
    .min(0, 'Must be positive')
    .max(100, 'Must be less than 100')
});

interface Province {
  id: number;
  name_en: string;
  name_np: string;
}
interface FiscalYear {
  id: number;
  name: string;
}
interface MinimumGrant {
  id: number;
  percent: string;
  amount: string;
}
export interface MinimumGrantDetails {
  id: number;
  minimum_grant: MinimumGrant;
  fiscal_year: FiscalYear;
  province: Province;
  population: number;
  area: number;
  amount: string;
}
export type MinimumGrantDetailsResponse = CommonArrayResponseTypes<MinimumGrantDetails[]>;
