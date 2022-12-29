import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

interface Budget {
  budget: BudgetData;
  has_minimum_grant: boolean;
}

export interface BudgetStatusData {
  gov_prov: Budget;
  gov_localbody: Budget;
  prov_localbody: Budget;
}

export interface BudgetData {
  id?: string | number;
  fiscal_year?: { id: number; name: string };
  name: string;
  amount: number;
}

export interface BudgetFormProps {
  id?: number;
  name: string;
  amount: number;
}

export const BudgetInitialValues: BudgetFormProps = {
  name: '',
  amount: 0
};

export const BudgetValidationSchema = Yup.object({
  amount: Yup.number().required('Amount is required')
});

export interface FinalGrantData {
  province: number;
  minimum_grant: string;
  performance_based: string;
  formula_based: string;
  total: string;
}
export type FinalGrantDataResponse = CustomResponse<FinalGrantData[]>;
