import { CommonArrayResponseTypes } from '@/helper/default-action';
import * as Yup from 'yup';

export interface FiscalYearParams {
  page_size?: string | number;
  page?: string | number;
  search?: string;
  escape_pg?: boolean;
}

export interface FiscalYearResponseType {
  id?: number;
  name: string;
}

export const fiscalYearInitialValues: FiscalYearResponseType = {
  name: ''
};

export const validationSchema = Yup.object({
  name: Yup.string().required('common:validation.fiscal_year').trim()
});

export interface FiscalYearResponseData {
  id?: number;
  name: string;
  is_active?: boolean;
}

export type FiscalYearResponse = CommonArrayResponseTypes<FiscalYearResponseData[]>;

export interface ToggleFiscalYearData {
  id: number;
  is_active?: boolean;
}
