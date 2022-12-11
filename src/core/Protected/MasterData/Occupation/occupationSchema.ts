import { notNumberRegex } from '@/utils/regex';
import * as Yup from 'yup';
import { CommonArrayResponseTypes } from '@/helper/default-action';

export interface initialValueProps {
  name: string;
}

export const initialValue: initialValueProps = {
  name: ''
};

export const validationSchema = Yup.object({
  name: Yup.string()
    .required('fields:occupation_name.requiredValidation')
    .trim()
    .matches(notNumberRegex, 'commons:validation.notNumberValidation')
    .max(255, 'fields:occupation_name.maxLengthValidation')
    .min(2, 'fields:occupation_name.minLengthValidation')
});

export interface RequestData {
  id?: number;
  name: string;
}
export interface OccupationResponseData {
  id?: number;
  name: string;
}

export type APIResponse = CommonArrayResponseTypes<OccupationResponseData[]>;
