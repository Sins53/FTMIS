import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator } from '../indicatorsCommonSchema';

export interface ToiletInitialValueProps {
  data: Array<{
    province: string | number;
    toilet_availability_index: string | number;
  }>;
}

export const ToiletInitialValue: ToiletInitialValueProps = {
  data: [
    { province: '', toilet_availability_index: '' },
    { province: '', toilet_availability_index: '' },
    { province: '', toilet_availability_index: '' },
    { province: '', toilet_availability_index: '' },
    { province: '', toilet_availability_index: '' },
    { province: '', toilet_availability_index: '' },
    { province: '', toilet_availability_index: '' }
  ]
};

export const ToiletValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      toilet_availability_index: Yup.number().required('Toilet Availability Index is required')
    })
  )
});

export interface ToiletDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  province: number;
  indicator: Indicator;
  toilet_availability_index: string;
  obtained_marks: string;
}
export type ToiletDetailsDataResponse = CustomResponse<ToiletDetailsData[]>;
