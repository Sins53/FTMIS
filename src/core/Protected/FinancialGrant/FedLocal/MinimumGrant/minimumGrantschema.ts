import { CommonArrayResponseTypes, CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface PopulationRangeData {
  id: number;
  is_deleted: boolean;
  created_date: string;
  updated_date: string;
  min_pop_range: number;
  max_pop_range: number;
  created_by?: string | number;
  updated_by?: string | number;
  fiscal_year?: string | number;
}

export type PopulationRangeResponse = CommonArrayResponseTypes<PopulationRangeData[]>;

export interface MinGrantInitialValueProps {
  data: Array<{
    population_range: string | number;
    number_of_localbody: string | number;
    minimum_grant_amount: string | number;
  }>;
}

export const MinGrantFormInitialValues: MinGrantInitialValueProps = {
  data: []
};

export const MinGrantValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      number_of_localbody: Yup.number()
        .required('Number of Local Government is required')
        .min(0, 'Must be positive'),
      minimum_grant_amount: Yup.number()
        .required('Minimum Grant amount is required')
        .min(0, 'Must be positive')
    })
  )
});

interface Budget {
  name?: string | number;
  amount?: string | number;
}

interface FiscalYear {
  name: string;
}
export interface MinimumGrantPercent {
  fiscal_year: FiscalYear;
  budget: Budget;
  percent?: string | number;
  total_minimum_grant_amount?: string | number;
  has_localbody_details: boolean;
}

export type MinimumGrantPercentResponse = CustomResponse<MinimumGrantPercent>;

interface PopulationRange {
  min_pop_range: number | string;
  max_pop_range: number | string;
}
export interface FedToLocalMinimumGrantData {
  id: number;
  population_range: PopulationRange;
  number_of_localbody: number;
  minimum_grant_amount: number;
  total_minimum_grant: number;
}
export type FedToLocalMinimumGrantDataResponse = CustomResponse<FedToLocalMinimumGrantData[]>;
