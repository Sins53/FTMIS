import * as Yup from 'yup';
import { CommonArrayResponseTypes } from '@/helper/default-action';
import { notNumberRegex } from '@/utils/regex';

export interface initialValueProps {
  name: string;
}

export const initialValue: initialValueProps = {
  name: ''
};

export const validationSchema = Yup.object({
  name: Yup.string()
    .required('fields:self_employment_name.requiredValidation')
    .trim()
    .matches(notNumberRegex, 'commons:validation.notNumberValidation')
    .max(255, 'fields:self_employment_name.maxLengthValidation')
    .min(2, 'fields:self_employment_name.minLengthValidation')
});

export interface RequestData {
  id?: number;
  name: string;
}
export interface DesignationResponseData {
  id?: number;
  name: string;
}

export type APIResponse = CommonArrayResponseTypes<DesignationResponseData[]>;
