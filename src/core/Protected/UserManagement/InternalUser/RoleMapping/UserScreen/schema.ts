import { OptionType } from '@/components/StyledSelect/StyledSelect';
import { CommonArrayResponseTypes, CustomResponse } from '@/helper/default-action';
import { PRIVILEGE_SCREEN_TYPE } from '@/shared/enums';
import * as Yup from 'yup';

export interface UserScreenRequestData {
  menus: Array<number | string>;
  type: PRIVILEGE_SCREEN_TYPE;
  id: number | undefined;
}

export interface UserPrivilegeRequestData {
  menu: number | undefined;
  user: number | undefined;
  privilege: number[];
}

export interface UserScreenFormData {
  menus: Array<OptionType>;
}

export const userScreenInitialValues: UserScreenFormData = {
  menus: []
};

export const userScreenValidationSchema = Yup.object({
  menus: Yup.array().required('Screen is required.')
});

export interface MenuIdUserIdParams {
  menuId: number;
  userId: number;
}

//here
interface ScreenByUserData {
  menu: MenuData[];
  user: UserDetails;
}

export interface UserDetails {
  id: number;
  user: number;
  email: string;
  mobile_number: string;
  is_active: boolean;
  first_name: string;
  first_name_np: string;
  middle_name: string;
  middle_name_np: string;
  last_name: string;
  last_name_np: string;
  employee_id: string;
  picture: string;
  designation: number;
  designation_title_en: string;
  designation_title_np: string;
  department: number;
  department_title_en: string;
  department_title_np: string;
  province: number;
  province_name_en: string;
  province_name_np: string;
  branch: number;
  branch_name_en: string;
  branch_name_np: string;
}

export interface MenuData {
  menu_id: number;
  menu_code: string;
  menu_name: string;
}

export interface Menu {
  menu_id: number;
  menu_code: string;
  menu_name: string;
  privilege: number[];
}

export interface ScreenListResponseData {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  parent?: any;
  order_id: number;
  url: string;
  icon?: any;
  privilege: Privilege[];
}

export interface Privilege {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
}

export type ScreenListResponse = CommonArrayResponseTypes<ScreenListResponseData[]>;
export type ScreenByUserResponse = CustomResponse<ScreenByUserData>;
export type ScreenByRoleIdMenuIdResponse = CustomResponse<Menu>;
