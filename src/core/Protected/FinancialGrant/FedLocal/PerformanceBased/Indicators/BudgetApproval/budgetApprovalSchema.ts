import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface BudgetApprovalInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  comply: string | number;
  approval_date: string | null | number;
}

export const BudgetApprovalInitialValue: BudgetApprovalInitialValueProps = {
  comply: '',
  approval_date: null
};

export const BudgetApprovalValidationSchema = Yup.object({
  comply: Yup.string().required('Choose either Yes / No')
});

export interface FedToLocalBudgetApprovalData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  obtained_marks: string | number;
  comply: string;
  approval_date: string;
}

export type BudgetApprovalResponse = CommonArrayResponseTypes<FedToLocalBudgetApprovalData[]>;
