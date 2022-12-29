import { CustomResponse } from '@/helper/default-action';
import { Province } from '../../FormulaBased/Indicators/indicatorsCommonSchema';
import * as Yup from 'yup';

export interface PerformanceGrantFormProps {
  id?: number;
  fiscal_year?: string | number;
  budget: number | string;
  percent: number | string;
}

export const PerformanceGrantInitialValues: PerformanceGrantFormProps = {
  budget: '',
  percent: ''
};

export const PerformanceValidationSchema = Yup.object({
  percent: Yup.number().required('Performance Based Percent is required').min(0, 'Must be positive')
});

export interface FiscalYear {
  id: number;
  name: string;
}

export interface Budget {
  id: number;
  name: string;
  amount: string;
}

export interface PerformanceGrantDatum {
  id: number;
  fiscal_year: FiscalYear;
  budget: Budget;
  percent: string;
  amount: number;
  has_indicator: boolean;
}

export interface PerformanceGrantResultData {
  province: Province;
  obtained_marks: string;
  marks_prop: string;
  grant_received: string;
}
export type PerformanceGrantResultDataResponse = CustomResponse<PerformanceGrantResultData[]>;
