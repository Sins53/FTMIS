import { CommonArrayResponseTypes, CustomResponse } from '@/helper/default-action';
import * as Yup from 'yup';
export interface roleFormProps {
  id?: string | number;
  name: string;
  code: string;
  is_active: boolean;
}

export const roleInitialValues: roleFormProps = {
  name: '',
  code: '',
  is_active: true
};

export const roleValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required.')
    .matches(/^[aA-zZ\s]+$/, 'fields:alphabetValidation')
    .max(50, 'Maximum 50 characters allowed')
    .min(2, 'Minimun 2 characters required')
    .trim(),
  code: Yup.string().required('Code is required.').trim()
});

export interface RoleData {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
}

export interface RoleDetailData {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  users: RoleUserData[];
}
export interface RoleUserData {
  id: number;
  user: number;
  is_active: boolean;
  first_name: string;
  first_name_np?: any;
  middle_name: string;
  middle_name_np?: any;
  last_name: string;
  last_name_np?: any;
  employee_id: string;
  picture?: string;
  designation: number;
  designation_title_en: string;
  designation_title_np: string;
  department?: number;
  department_title_en?: string;
  department_title_np?: string;
  province: number;
  province_name_en: string;
  province_name_np: string;
  branch: number;
  branch_name_en: string;
  branch_name_np: string;
}

export interface UnassignedUserData {
  id: number;
  employee_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  designation: Designation;
}

interface Designation {
  id: number;
  name_en: string;
  name_np: string;
}

export type RoleDataResponse = CommonArrayResponseTypes<RoleData>;
export type RoleDetailDataResponse = CustomResponse<RoleDetailData>;
export type UnassignedUserResponse = CustomResponse<UnassignedUserData[]>;
