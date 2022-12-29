import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface RevenueCollectionRatioInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  projected_revenue: string | number;
  collected_revenue: string | number;
}

export const RevenueCollectionRatioInitialValue: RevenueCollectionRatioInitialValueProps = {
  projected_revenue: '',
  collected_revenue: ''
};

export const RevenueCollectionRatioValidationSchema = Yup.object({
  projected_revenue: Yup.number()
    .required('Projected Revenue is required')
    .min(0, 'Must be positive'),
  collected_revenue: Yup.number()
    .required('Collected Revenue is required')
    .min(0, 'Must be positive')
});

export interface FedToLocalRevenueRatioData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  revenue_pct: string | number;
  difference: string | number;
  obtained_marks: string | number;
  projected_revenue: string;
  collected_revenue: string;
}

export type RevenueRatioResponse = CommonArrayResponseTypes<FedToLocalRevenueRatioData[]>;
