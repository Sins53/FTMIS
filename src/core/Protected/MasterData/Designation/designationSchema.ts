import { notNumberRegex } from '@/utils/regex';
import * as Yup from 'yup';
import { CommonArrayResponseTypes } from '@/helper/default-action';

export interface initialValueProps {
  name_en: string;
  name_np: string;
}

export const initialValue: initialValueProps = {
  name_en: '',
  name_np: ''
};

export const validationSchema = Yup.object({
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
    .min(2, 'fields:nameNp.minLengthValidation')
});

export interface RequestData {
  id?: number;
  name_en: string;
  name_np: string;
}
export interface DesignationResponseData {
  id?: number;
  name_en: string;
  name_np: string;
}

export type APIResponse = CommonArrayResponseTypes<DesignationResponseData[]>;
