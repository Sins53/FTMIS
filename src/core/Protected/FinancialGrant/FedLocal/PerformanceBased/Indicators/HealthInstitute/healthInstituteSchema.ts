import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface HealthInstituteInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  pregnants_number: string | number;
  no_of_delivery_at_health_institute: string | number;
}

export const HealthInstituteInitialValue: HealthInstituteInitialValueProps = {
  pregnants_number: '',
  no_of_delivery_at_health_institute: ''
};

export const HealthInstituteValidationSchema = Yup.object({
  pregnants_number: Yup.number()
    .required('No. of Pregnants is required')
    .min(0, 'Must be positive'),
  no_of_delivery_at_health_institute: Yup.number()
    .required('No. of Deliveries at Health Institute is required')
    .min(0, 'Must be positive')
});

export interface FedToLocalHealthInstituteData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  difference: string | number;
  obtained_marks: string | number;
  pregnants_number: string;
  no_of_delivery_at_health_institute: string;
  rate: string;
  average_rate: string;
}

export type HealthInstituteResponse = CommonArrayResponseTypes<FedToLocalHealthInstituteData[]>;
