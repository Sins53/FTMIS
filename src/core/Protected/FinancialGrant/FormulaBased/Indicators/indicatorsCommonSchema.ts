import { ProvinceData } from '@/core/Protected/MasterData/Location/schema';

export interface Province {
  id: number;
  name_en: string;
  name_np: string;
}

export interface Indicator {
  id: number;
  marks: number;
}

export interface FiscalYear {
  id: number;
  name: string;
}

export interface FormulaIndicatorsProps {
  provinceData: ProvinceData[];
}
