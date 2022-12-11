import { CustomResponse } from '@/helper/default-action';
import { Province } from '../FormulaBased/Indicators/indicatorsCommonSchema';

// import * as Yup from 'yup';
export interface PerformanceGrantData {
  id: number;
  name: string;
}

export interface PerformanceGrantFormProps {
  id?: number;
  fiscal_year?: string | number;
  budget: number | string | undefined;
  percent: number;
}

export const PerformanceGrantInitialValues: PerformanceGrantFormProps = {
  // fiscal_year: '',
  budget: 0,
  percent: 0
};

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
}

export interface PerformanceGrantResultData {
  province: Province;
  obtained_marks: string;
  marks_prop: string;
  grant_received: string;
}
export type PerformanceGrantResultDataResponse = CustomResponse<PerformanceGrantResultData[]>;
