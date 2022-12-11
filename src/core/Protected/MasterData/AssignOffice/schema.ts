import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

export interface AssignHeadOfficeRequestData {
  branch_id: number | undefined;
}

export interface AssignProvinceOfficeRequestData {
  branch_id: number | undefined;
  province_id: number | undefined;
}

interface AssignOfficeResponseData {
  provinces: Province[];
  head_office: Headoffice;
}

export interface Headoffice {
  id: number;
  name_en: string;
  name_np: string;
  branch: Branch;
}

export interface Province {
  id: number;
  name_en: string;
  name_np: string;
  branch?: Branch;
}

interface Branch {
  id: number;
  name_en: string;
  name_np: string;
  address: string;
  is_head_office: boolean;
  is_province_office: boolean;
}

export type AssignOfficeDataResponse = CustomResponse<AssignOfficeResponseData>;

export interface AssignOfficeFormData {
  branch_id: number | undefined;
}

export const assignOfficeInitialValue: AssignOfficeFormData = {
  branch_id: undefined
};

export const assignOfficeValidationSchema = Yup.object({
  branch_id: Yup.number().required('fields:province_office.requiredValidation')
});
