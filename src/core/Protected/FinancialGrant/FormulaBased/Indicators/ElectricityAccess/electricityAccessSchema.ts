import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, Province } from '../indicatorsCommonSchema';

export interface ElectricityAccessInitialValueProps {
  data: Array<{
    province: string | number;
    household_with_electricity: string | number;
    total_house_hold: string | number;
  }>;
}

export const ElectricityAccessInitialValue: ElectricityAccessInitialValueProps = {
  data: [
    { province: '', household_with_electricity: '', total_house_hold: '' },
    { province: '', household_with_electricity: '', total_house_hold: '' },
    { province: '', household_with_electricity: '', total_house_hold: '' },
    { province: '', household_with_electricity: '', total_house_hold: '' },
    { province: '', household_with_electricity: '', total_house_hold: '' },
    { province: '', household_with_electricity: '', total_house_hold: '' },
    { province: '', household_with_electricity: '', total_house_hold: '' }
  ]
};

export const ElectricityAccessValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      household_with_electricity: Yup.number().required('Households with Electricity is required'),
      total_house_hold: Yup.number().required('Total Household is required')
    })
  )
});

export interface ElectricityAccessDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  province: Province;
  indicator: Indicator;
  household_with_electricity: string;
  total_house_hold: string;
  obtained_marks: string;
}
export type ElectricityAccessDetailsDataResponse = CustomResponse<ElectricityAccessDetailsData[]>;
