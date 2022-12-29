import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface EqualizationGrantToLgInitialValueProps {
  data: Array<{
    province: string | number;
    grant_amount?: number | null;
    provided_date?: string | number | null;
    comply: string;
  }>;
}

export const EqualizationGrantToLgInitialValue: EqualizationGrantToLgInitialValueProps = {
  data: []
};

export const EqualizationGrantToLgValidationSchema = Yup.object({
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
export interface EqualizationGrantToLgDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  indicator: Indicator;
  province: Province;
  grant_amount?: number | null;
  provided_date?: string | null;
  comply: string;
  obtained_marks: string;
}
export type EqualizationGrantToLgDetailsDataResponse = CustomResponse<
  EqualizationGrantToLgDetailsData[]
>;
