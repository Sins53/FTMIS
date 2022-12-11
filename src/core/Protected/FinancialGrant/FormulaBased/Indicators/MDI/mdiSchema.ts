import { CustomResponse } from '@/helper/default-action';
import { FiscalYear, Indicator } from '../indicatorsCommonSchema';

export interface MdiDetailData {
  id: number;
  fiscal_year: FiscalYear;
  province: number;
  indicator: Indicator;
  mdi: string;
  obtained_marks: string;
}

export type MdiDetailDataResponse = CustomResponse<MdiDetailData[]>;
