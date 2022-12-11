import { notNumberRegex } from '@/utils/regex';
import { CommonArrayResponseTypes } from '@/helper/default-action';
//import { generateLabelValueArray } from '@/utils/selectHelper';
//import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
//const { t } = useTranslation();
interface Province {
  id: number | null;
  name_en: string;
  name_np: string;
}
export interface BranchData {
  id?: number;
  name_en: string;
  name_np: string;
  address: string;
  branch_code: string;
  province: Province | null;
  is_head_office: boolean;
  is_province_office: boolean;
  is_deleted?: boolean;
}
//const G = generateLabelValueArray;
export interface BranchResponseData {
  id?: number;
  name_en: string;
  name_np: string;
  address: string;
  branch_code: string;
  province: Province;
}
export interface branchInitialValueProp {
  id?: number;
  name_en: string;
  name_np: string;
  address: string;
  branch_code: string;
  province: number | null | undefined;
  is_head_office: boolean;
  is_province_office: boolean;
  is_deleted?: boolean;
}
export const branchInitialValue: branchInitialValueProp = {
  name_en: '',
  name_np: '',
  address: '',
  branch_code: '',
  province: null,
  is_head_office: false,
  is_province_office: false,
  is_deleted: false
};
export type BranchDataResponse = CommonArrayResponseTypes<BranchData[]>;
export const branchValidationSchema = Yup.object({
  name_en: Yup.string()
    .required('fields:nameEn.requiredValidation')
    .trim()
    .max(255, 'fields:nameEn.maxLengthValidation')
    .min(2, 'fields:nameEn.minLengthValidation')
    .matches(notNumberRegex, 'commons:validation.notNumberValidation'),

  name_np: Yup.string()
    .required('fields:nameNp.requiredValidation')
    .trim()
    .max(255, 'fields:nameNp.maxLengthValidation')
    .min(2, 'fields:nameNp.minLengthValidation'),
  address: Yup.string()
    .required('fields:address.requiredValidation')
    .trim()
    .max(255, 'fields:address.maxLengthValidation')
    .min(2, 'fields:address.minLengthValidation'),
  branch_code: Yup.string()
    .required('fields:branchCode.requiredValidation')
    .trim()
    .max(4, 'fields:branchCode.maxLengthValidation')
    .min(4, 'fields:branchCode.minLengthValidation'),
  province: Yup.string().required('fields:province.requiredValidation').nullable()
});

export interface branchRequestData {
  id?: number;
  name_en: string;
  name_np: string;
  address: string;
  branch_code: string;
  province: number | null | undefined;
  is_head_office: boolean;
  is_province_office: boolean;
  is_deleted?: boolean;
}
