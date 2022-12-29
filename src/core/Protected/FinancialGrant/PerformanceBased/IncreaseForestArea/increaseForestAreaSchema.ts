import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface IncreaseForestAreaInitialValueProps {
  data: Array<{
    province: string | number;
    previous_year_target: string | number;
    progress: string | number;
  }>;
}

export const IncreaseForestAreaInitialValue: IncreaseForestAreaInitialValueProps = {
  data: []
};

export const IncreaseForestAreaValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      previous_year_target: Yup.number()
        .required('Projected Revenue is required')
        .min(0, 'Must be positive'),
      progress: Yup.number().required('Collected Revenue is required').min(0, 'Must be positive')
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
export interface ForestAreaDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  indicator: Indicator;
  province: Province;
  previous_year_target: number;
  progress: number;
  progress_pct: string;
  obtained_marks: number;
}
export type ForestAreaDetailsDataResponse = CustomResponse<ForestAreaDetailsData[]>;
