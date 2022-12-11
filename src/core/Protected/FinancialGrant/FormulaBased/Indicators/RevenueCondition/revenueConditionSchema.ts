import { CustomResponse } from '@/helper/default-action';
import { FiscalYear, Indicator } from '../indicatorsCommonSchema';

export interface RevenueConditionDetailData {
  id: number;
  fiscal_year: FiscalYear;
  province: number;
  indicator: Indicator;
  obtained_marks: string;
}

export type RevenueConditionDetailDataResponse = CustomResponse<RevenueConditionDetailData[]>;
