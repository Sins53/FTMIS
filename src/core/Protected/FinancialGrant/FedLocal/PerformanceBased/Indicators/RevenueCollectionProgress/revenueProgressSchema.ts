import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';
import { FiscalYear, Indicator, LocalBody } from '../../indicatorsCommonSchema';

export interface RevenueCollectionProgressInitialValueProps {
  id?: string | number;
  name?: string;
  fiscal_year?: string | number;
  previous_year_collected_revenue: string | number;
  last_year_collected_revenue: string | number;
}

export const RevenueCollectionProgressInitialValue: RevenueCollectionProgressInitialValueProps = {
  previous_year_collected_revenue: '',
  last_year_collected_revenue: ''
};

export const RevenueCollectionProgressValidationSchema = Yup.object({
  previous_year_collected_revenue: Yup.number().required('Projected Revenue is required'),
  last_year_collected_revenue: Yup.number().required('Collected Revenue is required')
});

export interface FedToLocalRevenueProgressData {
  id: number;
  localbody: LocalBody;
  indicator: Indicator;
  fiscal_year: FiscalYear;
  growth_pct: string | number;
  difference: string | number;
  obtained_marks: string | number;
  previous_year_collected_revenue: string;
  last_year_collected_revenue: string;
}

export type RevenueProgressResponse = CommonArrayResponseTypes<FedToLocalRevenueProgressData[]>;
