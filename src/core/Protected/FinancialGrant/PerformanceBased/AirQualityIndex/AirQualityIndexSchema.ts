import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
export interface AirQualityFormProps {
  data: Array<{
    province: string | number;
    previous_year_aqi: string | number;
    last_year_aqi: string | number;
    improvement: string;
  }>;
}

export const AirQualityInitialValues: AirQualityFormProps = {
  data: []
};

export const AirQualityValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      previous_year_aqi: Yup.number()
        .required('Previous year air quality index is required')
        .min(0, 'Must be positive'),
      last_year_aqi: Yup.number()
        .required('Last year air quality index is required')
        .min(0, 'Must be positive'),
      improvement: Yup.string().required('Improvement is required')
    })
  )
});

interface Province {
  id: number;
  name_en: string;
  name_np: string;
}
interface Indicator {
  id: number;
  marks: number;
}
interface FiscalYear {
  id: number;
  name: string;
}
export interface AirQualityDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  indicator: Indicator;
  province: Province;
  previous_year_aqi: number;
  last_year_aqi: number;
  difference: string;
  improvement: string;
  obtained_marks: number;
}
export type AirQualityDetailsDataResponse = CustomResponse<AirQualityDetailsData[]>;
