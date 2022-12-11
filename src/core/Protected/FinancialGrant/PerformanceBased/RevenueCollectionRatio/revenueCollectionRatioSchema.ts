import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface RevenueCollectionRatioInitialValueProps {
  data: Array<{
    province: string | number;
    projected_revenue: string | number;
    collected_revenue: string | number;
  }>;
}

export const RevenueCollectionRatioInitialValue: RevenueCollectionRatioInitialValueProps = {
  data: [
    { province: '', projected_revenue: '', collected_revenue: '' },
    { province: '', projected_revenue: '', collected_revenue: '' },
    { province: '', projected_revenue: '', collected_revenue: '' },
    { province: '', projected_revenue: '', collected_revenue: '' },
    { province: '', projected_revenue: '', collected_revenue: '' },
    { province: '', projected_revenue: '', collected_revenue: '' },
    { province: '', projected_revenue: '', collected_revenue: '' }
  ]
};

export const RevenueCollectionRatioValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      projected_revenue: Yup.number().required('Projected Revenue is required'),
      collected_revenue: Yup.number().required('Collected Revenue is required')
    })
  )
});

export interface RevenueCollectionRatioDetailsData {
  id: number;
  province: number;
  projected_revenue: string;
  collected_revenue: string;
  revenue_pct: string;
  difference: string;
  obtained_marks: string;
}
export type RevenueCollectionRatioDetailsDataResponse = CustomResponse<
  RevenueCollectionRatioDetailsData[]
>;
