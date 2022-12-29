import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, Province } from '../indicatorsCommonSchema';

export interface DrinkingWaterInitialValueProps {
  data: Array<{
    province: string | number;
    drinking_water_index: string | number;
  }>;
}

export const DrinkingWaterInitialValue: DrinkingWaterInitialValueProps = {
  data: [
    { province: '', drinking_water_index: '' },
    { province: '', drinking_water_index: '' },
    { province: '', drinking_water_index: '' },
    { province: '', drinking_water_index: '' },
    { province: '', drinking_water_index: '' },
    { province: '', drinking_water_index: '' },
    { province: '', drinking_water_index: '' }
  ]
};

export const DrinkingWaterValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      drinking_water_index: Yup.number().required('Drinking Water Index is required')
    })
  )
});

export interface DrinkingWaterDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  province: Province;
  indicator: Indicator;
  drinking_water_index: string;
  obtained_marks: string;
}
export type DrinkingWaterDetailsDataResponse = CustomResponse<DrinkingWaterDetailsData[]>;
