import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface BudgetReviewInitialValueProps {
  data: Array<{
    province: string | number;
    published_date: string | number | null;
    comply: string;
  }>;
}

export const BudgetReviewInitialValue: BudgetReviewInitialValueProps = {
  data: [
    { province: '', published_date: null, comply: '' },
    { province: '', published_date: null, comply: '' },
    { province: '', published_date: null, comply: '' },
    { province: '', published_date: null, comply: '' },
    { province: '', published_date: null, comply: '' },
    { province: '', published_date: null, comply: '' },
    { province: '', published_date: null, comply: '' }
  ]
};

export const BudgetReviewValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      comply: Yup.string().required('req')
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
export interface budgetReviewDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  indicator: Indicator;
  province: Province;
  published_date: string;
  comply: string;
  obtained_marks: number;
}
export type budgetReviewDetailsDataResponse = CustomResponse<budgetReviewDetailsData[]>;
