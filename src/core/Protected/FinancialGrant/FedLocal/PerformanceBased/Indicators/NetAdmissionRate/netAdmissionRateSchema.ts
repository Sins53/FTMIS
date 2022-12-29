import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface NetAdmissionRateInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  school_going_children: string | number;
  studying_children: string | number;
}

export const NetAdmissionRateInitialValue: NetAdmissionRateInitialValueProps = {
  school_going_children: '',
  studying_children: ''
};

export const NetAdmissionRateValidationSchema = Yup.object({
  school_going_children: Yup.number()
    .required('Number of School Going Children is required')
    .min(0, 'Must be positive'),
  studying_children: Yup.number()
    .required('Number of Studying Children is required')
    .min(0, 'Must be positive')
});

export interface FedToLocalNetAdmissionRateData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  difference: string | number;
  obtained_marks: string | number;
  school_going_children: string;
  studying_children: string;
  net_admission_rate: string;
}

export type NetAdmissionRateResponse = CommonArrayResponseTypes<FedToLocalNetAdmissionRateData[]>;
