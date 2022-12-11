import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface VehicleTaxInitialValueProps {
  data: Array<{
    province: string | number;
    comply: string;
  }>;
}

export const VehicleTaxInitialValue: VehicleTaxInitialValueProps = {
  data: [
    { province: '', comply: '' },
    { province: '', comply: '' },
    { province: '', comply: '' },
    { province: '', comply: '' },
    { province: '', comply: '' },
    { province: '', comply: '' },
    { province: '', comply: '' }
  ]
};

export const VehicleTaxValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      comply: Yup.string().required('req')
    })
  )
});

export interface VehicleTaxDetailsData {
  id: number;
  province: number;
  comply: string;
  marks: number;
}
export type VehicleTaxDetailsDataResponse = CustomResponse<VehicleTaxDetailsData[]>;
