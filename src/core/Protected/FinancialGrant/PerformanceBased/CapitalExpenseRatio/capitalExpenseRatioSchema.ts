import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface CapitalExpenseRatioInitialValueProps {
  data: Array<{
    province: string | number;
    allocation_expense: string | number;
    real_expense: string | number;
  }>;
}

export const CapitalExpenseRatioInitialValue: CapitalExpenseRatioInitialValueProps = {
  data: [
    { province: '', allocation_expense: '', real_expense: '' },
    { province: '', allocation_expense: '', real_expense: '' },
    { province: '', allocation_expense: '', real_expense: '' },
    { province: '', allocation_expense: '', real_expense: '' },
    { province: '', allocation_expense: '', real_expense: '' },
    { province: '', allocation_expense: '', real_expense: '' },
    { province: '', allocation_expense: '', real_expense: '' }
  ]
};

export const CapitalExpenseRatioValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      allocation_expense: Yup.number().required('Allocation Expense is rquired'),
      real_expense: Yup.number().required('Real Expense is required')
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
export interface CapitalExpenseRatioDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  indicator: Indicator;
  province: Province;
  allocation_expense: string;
  real_expense: string;
  expense_pct: string;
  difference: string;
  obtained_marks: string;
}
export type CapitalExpenseRatioDetailsDataResponse = CustomResponse<
  CapitalExpenseRatioDetailsData[]
>;
