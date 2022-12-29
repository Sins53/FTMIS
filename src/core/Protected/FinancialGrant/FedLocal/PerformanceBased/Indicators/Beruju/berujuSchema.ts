import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface BerujuInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  audited_amount: string | number;
  irregularities_amount: string | number;
}

export const BerujuInitialValue: BerujuInitialValueProps = {
  audited_amount: '',
  irregularities_amount: ''
};

export const BerujuValidationSchema = Yup.object({
  audited_amount: Yup.number().required('Audited Amount is required').min(0, 'Must be positive'),
  irregularities_amount: Yup.number()
    .required('Irregularity Amount is required')
    .min(0, 'Must be positive')
});

export interface FedToLocalBerujuData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  difference: string | number;
  obtained_marks: string | number;
  audited_amount: string;
  irregularities_amount: string;
  irregularities_pct: string;
}

export type BerujuResponse = CommonArrayResponseTypes<FedToLocalBerujuData[]>;
