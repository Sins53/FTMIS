import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Province } from './Indicators/indicatorsCommonSchema';

export interface formulaGrantInitialValueProp {
  total?: string | number;
  id?: string | number;
  percent: string;
  fiscal_year?: string | number;
  budget?: string | number;
}

export const formulaGrantInitialValue: formulaGrantInitialValueProp = {
  percent: '',
  budget: ''
};

export const formulaGrantValidationSchema = Yup.object({
  percent: Yup.number().required('req').min(0, 'Must be positive').max(100, 'Must be less than 100')
});

export interface FormulaGrantData {
  id: number;
  obtained_marks: string;
  grant_received: string;
  fiscal_year: FiscalYear;
  province: Province;
}
export type FormulaGrantDataResponse = CustomResponse<FormulaGrantData[]>;
