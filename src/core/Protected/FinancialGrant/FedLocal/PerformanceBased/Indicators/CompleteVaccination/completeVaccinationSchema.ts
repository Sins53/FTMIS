import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface CompleteVaccinationInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  below_24_months_children: string | number;
  childrens_taking_all_vaccination: string | number;
}

export const CompleteVaccinationInitialValue: CompleteVaccinationInitialValueProps = {
  below_24_months_children: '',
  childrens_taking_all_vaccination: ''
};

export const CompleteVaccinationValidationSchema = Yup.object({
  below_24_months_children: Yup.number()
    .required('No. of Children Below 24 months is required')
    .min(0, 'Must be positive'),
  childrens_taking_all_vaccination: Yup.number()
    .required('No. of Children Taking all Vaccination is required')
    .min(0, 'Must be positive')
});

export interface FedToLocalCompleteVaccinationData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  difference: string | number;
  obtained_marks: string | number;
  below_24_months_children: string;
  childrens_taking_all_vaccination: string;
  rate: string;
  average_rate: string;
}

export type CompleteVaccinationResponse = CommonArrayResponseTypes<
  FedToLocalCompleteVaccinationData[]
>;
