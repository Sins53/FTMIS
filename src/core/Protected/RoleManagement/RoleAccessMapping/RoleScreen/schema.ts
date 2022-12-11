import { OptionType } from '@/components/StyledSelect/StyledSelect';
import { CommonArrayResponseTypes, CustomResponse } from '@/helper/default-action';
import { PRIVILEGE_SCREEN_TYPE } from '@/shared/enums';
import * as Yup from 'yup';

export interface RoleScreenRequestData {
  menus: Array<number | string>;
  type: PRIVILEGE_SCREEN_TYPE;
  id: number | undefined;
}

export interface RolePrivilegeRequestData {
  menu: number | undefined;
  role: number | undefined;
  privilege: number[];
}

export interface ScreenFormData {
  menus: Array<OptionType>;
}

export const screenInitialValues: ScreenFormData = {
  menus: []
};

export const screenValidationSchema = Yup.object({
  menus: Yup.array().required('Screen is required.')
});

export interface MenuIdRoleIdParams {
  menuId: number;
  roleId: number;
}

export interface ScreenByRoleData {
  role_id: number;
  role_name: string;
  role_code: string;
  menus: Menu[];
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

export type AllScreenListResponse = CustomResponse<ScreenListResponseData[]>;
export type ScreenListResponse = CommonArrayResponseTypes<ScreenListResponseData[]>;
export type ScreenByRoleResponse = CustomResponse<ScreenByRoleData>;
export type ScreenByRoleIdMenuIdResponse = CustomResponse<Menu>;
