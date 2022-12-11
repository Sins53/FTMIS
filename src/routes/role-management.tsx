import { lazy } from 'react';
import { RouteProperties, SCREEN_CODE, USER_TYPE } from './props';
const Role = lazy(() => import('@/core/Protected/RoleManagement/Roles'));
const RoleAccessMapping = lazy(() => import('@/core/Protected/RoleManagement/RoleAccessMapping'));
const RoleManagement = lazy(() => import('@/core/Protected/RoleManagement/RoleManagement'));
const root = '/role-management/';

export const roleManagementPath = {
  roleAccessMapping: root + 'role-access-mapping/:id',
  screenGroup: root + 'screen-group',
  moduleList: root + 'module',
  createModule: root + 'module/module-form',
  editModule: root + 'module/module-form/:id',
  privilegeList: root + 'privilege',
  roleAssignment: root + 'roles'
};

export const roleManagementRoutes: RouteProperties = {
  path: root,
  element: RoleManagement,
  whiteList: true,
  children: [
    {
      path: roleManagementPath.roleAccessMapping,
      element: RoleAccessMapping,
      user_type: [USER_TYPE.INTERNAL],
      screen_codes: [SCREEN_CODE.ROLES]
    },
    {
      path: roleManagementPath.roleAssignment,
      element: Role,
      user_type: [USER_TYPE.INTERNAL],
      screen_codes: [SCREEN_CODE.ROLES]
    }
  ]
};
