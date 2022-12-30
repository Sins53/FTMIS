import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface ReportingToMofInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  comply: string | number;
  reporting_date: string | null | number;
}

export const ReportingToMofInitialValue: ReportingToMofInitialValueProps = {
  comply: '',
  reporting_date: null
};

export const ReportingToMofValidationSchema = Yup.object({
  comply: Yup.string().required('Choose either Yes / No')
});

export interface FedToLocalReportingToMofData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  obtained_marks: string | number;
  comply: string;
  reporting_date: string;
}

export type ReportingToMofResponse = CommonArrayResponseTypes<FedToLocalReportingToMofData[]>;
