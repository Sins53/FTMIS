import { CustomResponse } from '@/helper/default-action';
import { FiscalYear, Indicator, Province } from '../indicatorsCommonSchema';

export interface ItAccessDetailData {
  id: number;
  fiscal_year: FiscalYear;
  province: Province;
  indicator: Indicator;
  it_access_index: string;
  obtained_marks: string;
}

export type ItAccessDetailDataResponse = CustomResponse<ItAccessDetailData[]>;
