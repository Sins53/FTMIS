import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { Province } from '../../FormulaBased/Indicators/indicatorsCommonSchema';

export interface RevenueCollectionRatioInitialValueProps {
  data: Array<{
    province: string | number;
    projected_revenue: string | number;
    collected_revenue: string | number;
  }>;
}

export const RevenueCollectionRatioInitialValue: RevenueCollectionRatioInitialValueProps = {
  data: []
};

export const RevenueCollectionRatioValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      projected_revenue: Yup.number()
        .required('Projected Revenue is required')
        .min(0, 'Must be positive'),
      collected_revenue: Yup.number()
        .required('Collected Revenue is required')
        .min(0, 'Must be positive')
    })
  )
});

export interface RevenueCollectionRatioDetailsData {
  id: number;
  province: Province;
  projected_revenue: string;
  collected_revenue: string;
  revenue_pct: string;
  difference: string;
  obtained_marks: string;
}
export type RevenueCollectionRatioDetailsDataResponse = CustomResponse<
  RevenueCollectionRatioDetailsData[]
>;
