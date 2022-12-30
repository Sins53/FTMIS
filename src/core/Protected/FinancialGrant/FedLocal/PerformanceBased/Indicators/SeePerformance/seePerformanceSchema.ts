import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface SeePerformanceInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  students_appeared_in_see: string | number;
  scoring_more_gpa: string | number;
}

export const SeePerformanceInitialValue: SeePerformanceInitialValueProps = {
  students_appeared_in_see: '',
  scoring_more_gpa: ''
};

export const SeePerformanceValidationSchema = Yup.object({
  students_appeared_in_see: Yup.number()
    .required('Students Appearing in SEE is required')
    .min(0, 'Must be positive'),
  scoring_more_gpa: Yup.number()
    .required('Students Scoring more than 1.6 GPA is required')
    .min(0, 'Must be positive')
});

export interface FedToLocalSeePerformanceData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  difference: string | number;
  obtained_marks: string | number;
  students_appeared_in_see: string;
  scoring_more_gpa: string;
  consistency_rate: string;
}

export type SeePerformanceResponse = CommonArrayResponseTypes<FedToLocalSeePerformanceData[]>;
