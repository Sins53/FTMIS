import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface StudentConsistencyRateInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  students_in_class_eight: string | number;
  students_in_class_nine: string | number;
}

export const StudentConsistencyRateInitialValue: StudentConsistencyRateInitialValueProps = {
  students_in_class_eight: '',
  students_in_class_nine: ''
};

export const StudentConsistencyRateValidationSchema = Yup.object({
  students_in_class_eight: Yup.number()
    .required('Students in Class 8 is required')
    .min(0, 'Must be positive'),
  students_in_class_nine: Yup.number()
    .required('Students in Class 9 is required')
    .min(0, 'Must be positive')
});

export interface FedToLocalStudentConsistencyRateData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  difference: string | number;
  obtained_marks: string | number;
  students_in_class_eight: string;
  students_in_class_nine: string;
  expense_pct: string;
  average_expense: string;
}

export type StudentConsistencyRateResponse = CommonArrayResponseTypes<
  FedToLocalStudentConsistencyRateData[]
>;
