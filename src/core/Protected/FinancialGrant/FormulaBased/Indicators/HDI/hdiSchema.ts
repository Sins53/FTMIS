import { CustomResponse } from '@/helper/default-action';
import { FiscalYear, Indicator, Province } from '../indicatorsCommonSchema';

export interface HdiDetailData {
  id: number;
  fiscal_year: FiscalYear;
  province: Province;
  indicator: Indicator;
  hdi: string;
  obtained_marks: string;
}

export type HdiDetailDataResponse = CustomResponse<HdiDetailData[]>;
