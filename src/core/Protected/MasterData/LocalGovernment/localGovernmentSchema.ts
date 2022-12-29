import * as Yup from 'yup';
import { Province } from '../AssignOffice/schema';

export interface LocalGovernmentResponse {
  id: number;
  name_en: string;
  name_np: string;
  province: number;
  localbody_code: number;
  localbody_type: string;
}

export interface FiscalLocalGovernmentInitialValueProp {
  id?: number | string;
  fiscal_year?: string | number;
  localbody: number | string;
  population: number | string;
  area: number | string;
  road: number | string;
  sed: number | string;
  hdi: number | string;
  it_access: number | string;
  drinking_water: number | string;
  name?: string;
}
export const FiscalLocalGovernmentInitialValue: FiscalLocalGovernmentInitialValueProp = {
  localbody: '',
  population: '',
  area: '',
  road: '',
  sed: '',
  hdi: '',
  it_access: '',
  drinking_water: '',
  name: ''
};

export const FiscalLocalGovernmentValidationSchema = Yup.object({
  population: Yup.number().required('Total population is required').min(0, 'Must be Positive'),
  area: Yup.number().required('Area is required').min(0, 'Must be Positive'),
  road: Yup.number().required('Road value is required').min(0, 'Must be Positive'),
  sed: Yup.number().required('SED value is required').min(0, 'Must be Positive'),
  hdi: Yup.number().required('HDI value is required').min(0, 'Must be Positive'),
  it_access: Yup.number().required('It Access is required').min(0, 'Must be Positive'),
  drinking_water: Yup.number().required('Drinking Water is required').min(0, 'Must be Positive')
});

export interface LocalGovernmentType {
  fiscal_year: any;
  province: any;
}

export const LocalGovernmentFilterInitialValues: LocalGovernmentType = {
  fiscal_year: null,
  province: null
};

interface Localbody {
  id: number;
  name_en: string;
  name_np: string;
  province: Province;
  localbody_code: number;
}
export interface FiscalLocalGovernmentData {
  localbody: Localbody;
  details?: any;
}
