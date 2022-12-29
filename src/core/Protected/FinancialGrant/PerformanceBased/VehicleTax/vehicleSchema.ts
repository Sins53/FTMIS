import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { Province } from '../../FormulaBased/Indicators/indicatorsCommonSchema';

export interface VehicleTaxInitialValueProps {
  data: Array<{
    province: string | number;
    comply: string;
  }>;
}

export const VehicleTaxInitialValue: VehicleTaxInitialValueProps = {
  data: []
};

export const VehicleTaxValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      comply: Yup.string().required('Choose either Yes / No')
    })
  )
});

export interface VehicleTaxDetailsData {
  id: number;
  province: Province;
  comply: string;
  marks: number;
}
export type VehicleTaxDetailsDataResponse = CustomResponse<VehicleTaxDetailsData[]>;
