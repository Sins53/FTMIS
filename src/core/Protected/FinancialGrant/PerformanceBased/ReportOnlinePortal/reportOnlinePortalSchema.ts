import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { ComplianceInitialValueProps } from '../Compliance/complianceSchema';

export const ReportOnlinePortalInitialValues: ComplianceInitialValueProps = {
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

export const ReportOnlinePortalValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      comply: Yup.string().required('Compliance is required')
    })
  )
});

interface Province {
  id: number;
  name_en: string;
  name_np: string;
}
interface Indicator {
  id: number;
  marks: number;
}
interface FiscalYear {
  id: number;
  name: string;
}
export interface onlinePortalDetailsData {
  id: number;
  fiscal_year: FiscalYear;
  indicator: Indicator;
  province: Province;
  comply: string;
  obtained_marks: number;
}
export type onlinePortalDetailsDataResponse = CustomResponse<onlinePortalDetailsData[]>;
