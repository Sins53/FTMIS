import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface ReportOnlinePortalInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  comply: string | number;
}

export const ReportOnlinePortalInitialValue: ReportOnlinePortalInitialValueProps = {
  comply: ''
};

export const ReportOnlinePortalValidationSchema = Yup.object({
  comply: Yup.string().required('Choose either Yes / No')
});

export interface FedToLocalReportOnlinePortalData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  obtained_marks: string | number;
  comply: string;
}

export type ReportOnlinePortalResponse = CommonArrayResponseTypes<
  FedToLocalReportOnlinePortalData[]
>;
