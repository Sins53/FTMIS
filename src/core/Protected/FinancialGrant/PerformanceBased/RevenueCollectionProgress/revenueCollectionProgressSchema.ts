import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface RevenueCollectionProgressInitialValueProps {
  data: Array<{
    province: string | number;
    previous_year_collected_revenue: string | number;
    last_year_collected_revenue: string | number;
  }>;
}

export const RevenueCollectionProgressInitialValue: RevenueCollectionProgressInitialValueProps = {
  data: [
    { province: '', previous_year_collected_revenue: '', last_year_collected_revenue: '' },
    { province: '', previous_year_collected_revenue: '', last_year_collected_revenue: '' },
    { province: '', previous_year_collected_revenue: '', last_year_collected_revenue: '' },
    { province: '', previous_year_collected_revenue: '', last_year_collected_revenue: '' },
    { province: '', previous_year_collected_revenue: '', last_year_collected_revenue: '' },
    { province: '', previous_year_collected_revenue: '', last_year_collected_revenue: '' },
    { province: '', previous_year_collected_revenue: '', last_year_collected_revenue: '' }
  ]
};

export const RevenueCollectionProgressValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      previous_year_collected_revenue: Yup.number().required('Projected Revenue is required'),
      last_year_collected_revenue: Yup.number().required('Collected Revenue is required')
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
export interface RevenueCollectionProgressDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  indicator: Indicator;
  province: Province;
  previous_year_collected_revenue: string;
  last_year_collected_revenue: string;
  growth_pct: string;
  difference: string;
  obtained_marks: string;
}
export type RevenueCollectionProgressDetailsDataResponse = CustomResponse<
  RevenueCollectionProgressDetailsData[]
>;
