import { CustomResponse } from '@/helper/default-action';
import { FiscalYear, Indicator, Province } from '../indicatorsCommonSchema';

export interface RoadDensityDetailData {
  id: number;
  fiscal_year: FiscalYear;
  province: Province;
  indicator: Indicator;
  area: number;
  road: number;
  obtained_marks: string;
}

export type RoadDensityDetailDataResponse = CustomResponse<RoadDensityDetailData[]>;
