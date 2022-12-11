import { OptionType } from '@/components/StyledSelect/StyledSelect';
import { mobileNumberRegex } from '@/utils/regex';
import * as Yup from 'yup';

export interface InternalUserValueProps {
  id?: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  employee_id: string | number;
  designation: OptionType | null;
  province: OptionType | null;
  branch: OptionType | null;
  department: OptionType | null;
  role: OptionType | null;
  picture?:
    | {
        name?: string;
        image?: string;
        original?: any;
      }
    | null
    | string;
}

const FILE_SIZE = 1024 * 1024 * 1;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const internalUserInitialValue: InternalUserValueProps = {
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  employee_id: '',
  designation: null,
  province: null,
  branch: null,
  department: null,
  role: null,
  picture: null
};

export const internalUserValidationSchema = Yup.object({
  first_name: Yup.string()
    .required('fields:first_name.requiredValidation')
    .trim()
    .max(255, 'fields:first_name.maxLengthValidation'),
  last_name: Yup.string()
    .required('fields:last_name.requiredValidation')
    .trim()
    .max(255, 'fields:last_name.maxLengthValidation'),
  middle_name: Yup.string().max(255, 'fields:middle_name.maxLengthValidation').nullable().trim(),
  email: Yup.string()
    .required('fields:email.requiredValidation')
    .email('fields:email.invalidEmail')
    .trim(),
  mobile_number: Yup.string()
    .required('fields:mobile.requiredValidation')
    .matches(mobileNumberRegex, 'common:user_profile_validations.invalid_phone')
    .nullable(),
  employee_id: Yup.string().required('fields:employee.requiredValidation').nullable(),
  designation: Yup.object().required('fields:designation.requiredValidation').nullable(),
  province: Yup.object().required('fields:province.requiredValidation').nullable(),
  branch: Yup.object().required('fields:branch.requiredValidation').nullable(),
  department: Yup.object().required('fields:department.requiredValidation').nullable(),
  role: Yup.object().required('common:profile.req_role').nullable(),
  picture: Yup.mixed()
    .nullable()
    // .required('Image is required')
    .test('fileSize', 'common:user_profile_validations.file_too_large_image', (value: any) => {
      console.log(value, 'value');
      return value?.original?.size ? value?.original?.size <= FILE_SIZE : true;
    })
    .test('fileFormat', 'common:user_profile_validations.unsupported_image', (value: any) =>
      value?.original?.type ? SUPPORTED_FORMATS.includes(value?.original?.type) : true
    )
  // province: Yup.number().required('Province is required.')
});

export interface InternalUserData {
  id?: number;
  user?: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email?: string;
  mobile_number: string;
  employee_id: string;
  designation: string | number;
  province: string | number;
  branch: string | number;
  department: string | number;
  role: string | number;
  picture?:
    | {
        name?: string;
        image?: string;
        original?: any;
      }
    | null
    | string;
  is_active?: boolean;
}

export interface InternalUserResponseData {
  id: number;
  username: string;
  mobile_number: string;
  email: string;
  user_type: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  employee_id: string;
  designation: ArrayData;
  province: ArrayData;
  branch: ArrayData;
  department: ArrayData;
  picture: string;
  role: ArrayData;
}

interface ArrayData {
  id: number;
  name_en: string;
  name_np: string;
  name?: string;
}

export interface InternalUserProvinceBranchParams {
  data: string;
  province_id?: number | string | undefined;
}
