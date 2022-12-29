import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface PeriodicPlanInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  comply: string | number;
}

export const PeriodicPlanInitialValue: PeriodicPlanInitialValueProps = {
  comply: ''
};

export const PeriodicPlanValidationSchema = Yup.object({
  comply: Yup.string().required('Comply is required')
});

export interface FedToLocalPeriodicPlanData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  obtained_marks: string | number;
  comply: string;
}

export type PeriodicPlanResponse = CommonArrayResponseTypes<FedToLocalPeriodicPlanData[]>;
