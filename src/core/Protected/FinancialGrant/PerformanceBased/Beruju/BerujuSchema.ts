import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { Province } from '../../FormulaBased/Indicators/indicatorsCommonSchema';
export interface BerujuInitialValueProps {
  data: Array<{
    province: string | number;
    audited_amount: string | number;
    beruju: string | number;
  }>;
}

export const BerujuFormInitialValues: BerujuInitialValueProps = {
  data: []
};

export const BerujuValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      audited_amount: Yup.number()
        .required('Audited Amount is required')
        .min(0, 'Must be positive'),
      beruju: Yup.number().required('Beruju is required').min(0, 'Must be positive')
    })
  )
});

export interface BerujuDetailsData {
  id: number;
  province: Province;
  audited_amount: string;
  beruju: string;
  beruju_pct: string;
  difference: string;
  obtained_marks: string;
}
export type BerujuDetailsDataResponse = CustomResponse<BerujuDetailsData[]>;
