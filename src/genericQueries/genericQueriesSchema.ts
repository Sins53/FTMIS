import { PublicInitResponse } from '@/providers/PublicProvider';
import { SCREEN_CODE, USER_TYPE } from '@/routes/props';

export interface BasicResponse {
  description: string;
  servedBy: string;
  status: number;
  success: boolean;
}
export interface UserListType {
  department: string[];
  designation: string;
  email: string;
  employeeCode: string;
  name: string;
  profilePic: string;
  roles: Role[];
  userId: string;
}

export interface PrivilegeItem {
  can_create: boolean;
  can_update: boolean;
  can_read: boolean;
  can_delete: boolean;
  can_approve: boolean;
  can_configure: boolean;
  can_transfer: boolean;
}
export interface PermissionItem {
  code: SCREEN_CODE;
  icon: string | null;
  id: number;
  is_active: boolean;
  name: string;
  name_np: string;
  order_id: number;
  parent: null | number;
  privilege: PrivilegeItem | null;
  url: string | null;
  children: [] | Array<PermissionItem>;
  user_type: USER_TYPE;
}

export interface UserType {
  id: number;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
}
export interface InitResponse {
  permissions: Array<PermissionItem>;
  user: UserType;
}

interface Role {
  id: number;
  name: string;
}
export interface UserListResponse extends BasicResponse {
  data: UserListType;
}

export interface ApplicationInterface extends BasicResponse {
  data: InitResponse;
}

export interface PublicInit extends BasicResponse {
  data: PublicInitResponse;
}
