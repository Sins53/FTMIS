import { CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';

const FILE_SIZE = 1024 * 1024 * 1;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export interface contactInitialValueProp {
  phone_number: string;
  email: string;
  address: string;
}

export const contactInitialValue: contactInitialValueProp = {
  phone_number: '',
  email: '',
  address: ''
};

export const contactValidationSchema = Yup.object({
  phone_number: Yup.string()
    .required('fields:landline_number.requiredValidation')
    .trim()
    .min(10, 'common:site_setting.landline_10'),
  email: Yup.string()
    .required('fields:email.requiredValidation')
    .email('fields:email.invalidEmail')
    .trim(),
  address: Yup.string().required('fields:address.requiredValidation').trim()
});

export interface logoInitialValueProp {
  logo?:
    | {
        name?: string;
        image?: string;
        original?: any;
      }
    | null
    | string;
}

export const logoInitialValue: logoInitialValueProp = {
  logo: null
};

export const logoValidationSchema = Yup.object({
  logo: Yup.mixed()
    .nullable()
    .required('loan:validations.image')
    .test('fileSize', 'loan:validations.file_too_large_image', (value: any) => {
      return value?.original?.size ? value?.original?.size <= FILE_SIZE : true;
    })
    .test('fileFormat', 'loan:validations.unsupported_image', (value: any) =>
      value?.original?.type ? SUPPORTED_FORMATS.includes(value?.original?.type) : true
    )
});

export interface SiteSettingProps {
  logo?:
    | {
        name?: string;
        image?: string;
        original?: any;
      }
    | null
    | string;
  phone_number?: string;
  email?: string;
  address?: string;
  id?: number;
}

export type SiteSettingResponse = CustomResponse<SiteSettingProps>;

export interface commonData {
  data: SiteSettingProps;
}
