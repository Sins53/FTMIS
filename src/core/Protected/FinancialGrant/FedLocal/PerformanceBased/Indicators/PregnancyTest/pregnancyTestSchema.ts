import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface PregnancyTestInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  pregnants_number: string | number;
  four_times_checked_pregnant_number: string | number;
}

export const PregnancyTestInitialValue: PregnancyTestInitialValueProps = {
  pregnants_number: '',
  four_times_checked_pregnant_number: ''
};

export const PregnancyTestValidationSchema = Yup.object({
  pregnants_number: Yup.number()
    .required('No. of Pregnants is required')
    .min(0, 'Must be positive'),
  four_times_checked_pregnant_number: Yup.number()
    .required('No. of Women who Checked out 4 times is required')
    .min(0, 'Must be positive')
});

export interface FedToLocalPregnancyTestData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  difference: string | number;
  obtained_marks: string | number;
  pregnants_number: string;
  four_times_checked_pregnant_number: string;
  expense_pct: string;
  average_expense: string;
}

export type PregnancyTestResponse = CommonArrayResponseTypes<FedToLocalPregnancyTestData[]>;
