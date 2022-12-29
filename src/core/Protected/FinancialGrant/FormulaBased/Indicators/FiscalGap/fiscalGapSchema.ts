import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, Province } from '../indicatorsCommonSchema';

export interface FiscalGapInitialValueProps {
  data: Array<{
    province: string | number;
    expense_need: string | number;
    revenue_capacity: string | number;
  }>;
}

export const FiscalGapInitialValue: FiscalGapInitialValueProps = {
  data: [
    { province: '', expense_need: '', revenue_capacity: '' },
    { province: '', expense_need: '', revenue_capacity: '' },
    { province: '', expense_need: '', revenue_capacity: '' },
    { province: '', expense_need: '', revenue_capacity: '' },
    { province: '', expense_need: '', revenue_capacity: '' },
    { province: '', expense_need: '', revenue_capacity: '' },
    { province: '', expense_need: '', revenue_capacity: '' }
  ]
};

export const FiscalGapValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      expense_need: Yup.number().required('Expense Need is required'),
      revenue_capacity: Yup.number().required('Revenue Capacity is required')
    })
  )
});

export interface FiscalGapDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  province: Province;
  indicator: Indicator;
  expense_need: string;
  revenue_capacity: string;
  obtained_marks: string;
}
export type FiscalGapDetailsDataResponse = CustomResponse<FiscalGapDetailsData[]>;
