import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface ReportingToMofInitialValueProps {
  data: Array<{
    province: string | number;
    reporting_date: string | number | null;
    comply: string;
  }>;
}

export const ReportingToMofInitialValue: ReportingToMofInitialValueProps = {
  data: []
};

export const ReportingToMofValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      comply: Yup.string().required('Choose either Yes / No')
    })
  )
});

interface Province {
  id: number;
  name_en: string;
  name_np: string;
}
interface Indicator {
  id: number;
  marks: number;
}
interface FiscalYear {
  id: number;
  name: string;
}
export interface mofReportingDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  indicator: Indicator;
  province: Province;
  reporting_date: string;
  comply: string;
  obtained_marks: number;
}
export type mofReportingDetailsDataResponse = CustomResponse<mofReportingDetailsData[]>;
