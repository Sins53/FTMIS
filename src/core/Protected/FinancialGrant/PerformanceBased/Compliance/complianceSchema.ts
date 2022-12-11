import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface ComplianceInitialValueProps {
  data: Array<{
    province: string | number;
    comply: string;
  }>;
}

export const ComplianceInitialValue: ComplianceInitialValueProps = {
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

export const ComplianceValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      comply: Yup.string().required('req')
    })
  )
});

export interface ComplianceDetailsData {
  id: number;
  province: number;
  comply: string;
  marks: number;
}
export type ComplianceDetailsDataResponse = CustomResponse<ComplianceDetailsData[]>;
