import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface TotalExpenseRatioInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  allocation_expense: string | number;
  real_expense: string | number;
}

export const TotalExpenseRatioInitialValue: TotalExpenseRatioInitialValueProps = {
  allocation_expense: '',
  real_expense: ''
};

export const TotalExpenseRatioValidationSchema = Yup.object({
  allocation_expense: Yup.number()
    .required('Allocated Expense is required')
    .min(0, 'Must be positive'),
  real_expense: Yup.number().required('Real Expense is required').min(0, 'Must be positive')
});

export interface FedToLocalTotalExpenseRatioData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  difference: string | number;
  obtained_marks: string | number;
  allocation_expense: string;
  real_expense: string;
  average_pct: string;
}

export type TotalExpenseRatioResponse = CommonArrayResponseTypes<FedToLocalTotalExpenseRatioData[]>;
