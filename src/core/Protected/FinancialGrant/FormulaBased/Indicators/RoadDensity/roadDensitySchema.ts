import { CustomResponse } from '@/helper/default-action';
import { FiscalYear, Indicator } from '../indicatorsCommonSchema';

export interface RoadDensityDetailData {
  id: number;
  fiscal_year: FiscalYear;
  province: number;
  indicator: Indicator;
  area: number;
  road: number;
  obtained_marks: string;
}

export type RoadDensityDetailDataResponse = CustomResponse<RoadDensityDetailData[]>;
