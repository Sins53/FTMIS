import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
export interface BerujuInitialValueProps {
  data: Array<{
    province: string | number;
    audited_amount: string | number;
    beruju: string | number;
  }>;
}

export const BerujuFormInitialValues: BerujuInitialValueProps = {
  data: [
    { province: '', audited_amount: '', beruju: '' },
    { province: '', audited_amount: '', beruju: '' },
    { province: '', audited_amount: '', beruju: '' },
    { province: '', audited_amount: '', beruju: '' },
    { province: '', audited_amount: '', beruju: '' },
    { province: '', audited_amount: '', beruju: '' },
    { province: '', audited_amount: '', beruju: '' }
  ]
};

export const BerujuValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      audited_amount: Yup.number().required('Audited Amount is rquired'),
      beruju: Yup.number().required('Beruju is required')
    })
  )
});

export interface BerujuDetailsData {
  id: number;
  province: number;
  audited_amount: string;
  beruju: string;
  beruju_pct: string;
  difference: string;
  obtained_marks: string;
}
export type BerujuDetailsDataResponse = CustomResponse<BerujuDetailsData[]>;
