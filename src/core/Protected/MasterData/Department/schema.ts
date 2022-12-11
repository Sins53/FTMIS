import { notNumberRegex } from '@/utils/regex';
import * as Yup from 'yup';
import { BasicResponse, CommonArrayResponseTypes } from '@/helper/default-action';
import { LanguageItem } from '@/utils/selectHelper';
//import { useTranslation } from 'react-i18next';
//const { t } = useTranslation();

export interface DepartmentRequestData {
  id?: number | null;
  name_en: string;
  name_np: string;
  parent_department: number | null;
  parent_type?: number | null;
}

export const departmentInitialValues: DepartmentRequestData = {
  name_en: '',
  name_np: '',
  parent_department: null,
  parent_type: null
};

export const departmentValidationSchema = Yup.object({
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
  parent_department: Yup.string().nullable().notRequired(),
  parent_type: Yup.string().nullable().required('common:validation.require_parent_type')
});

interface ParentType {
  id: string;
  name: string;
}
export interface DepartmentResponseData {
  id?: number;
  loan_category: number | string;
  name_en: string;
  name_np: string;
  description_en: string;
  description_np: string;
  parent_department: number | null;
  parent_department_name_en: string | null;
  parent_department_name_np: string | null;
  parent_type: ParentType;
}
export interface ProvinceOptionResponseData extends BasicResponse {
  data: LanguageItem[];
}

export type DepartmentResponse = CommonArrayResponseTypes<DepartmentResponseData[]>;
