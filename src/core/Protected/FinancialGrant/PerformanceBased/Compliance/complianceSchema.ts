import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
import { Province } from '../../FormulaBased/Indicators/indicatorsCommonSchema';

export interface ComplianceInitialValueProps {
  data: Array<{
    province: string | number;
    comply: string;
  }>;
}

export const ComplianceInitialValue: ComplianceInitialValueProps = {
  data: []
};

export const ComplianceValidationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object().shape({
      comply: Yup.string().required('Choose either Yes / No')
    })
  )
});

export interface ComplianceDetailsData {
  id: number;
  province: Province;
  comply: string;
  marks: number;
}
export type ComplianceDetailsDataResponse = CustomResponse<ComplianceDetailsData[]>;
