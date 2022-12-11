import { RequestBodyType, RequestMethod } from '../request';

const root = '/users';

const screenGroup = {
  getAllScreenGroupList: {
    controllerName: root + '/menus',
    queryKeyName: 'GET_ALL_SCREEN_GROUP',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getAllScreenListForConfig: {
    controllerName: root + '/user-role/menus',
    queryKeyName: 'GET_ALL_SCREEN_GROUP',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getAllPrivilegeList: {
    controllerName: root + '/privilege/list',
    queryKeyName: 'GET_ALL_PRIVILEGE_GROUP',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  addScreen: {
    controllerName: 'users/assign-menus-role-user',
    queryKeyName: 'CREATE_ROLE_SCREEN',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editPrivilege: {
    controllerName: root + '/assign-menu-role',
    queryKeyName: 'CREATE_SCREEN',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  deleteScreenByRoleId: {
    controllerName: root + '/menu-role-privilege-active/menu/{menuId}/role/{roleId}',
    queryKeyName: 'DELETE_SCREEN_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  getScreenByRoleId: {
    controllerName: root + '/menu-role-privilege/role/{id}',
    queryKeyName: 'GET_SCREEN_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getRoleUnAssignedUser: {
    controllerName: root + '/role-unassigned-users/{id}',
    queryKeyName: 'GET_ROLE_UNASSIGNED_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  assignUserInRole: {
    controllerName: root + '/assign-users-roles/{id}',
    queryKeyName: ' ASSIGN_USER_IN_ROLE',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  deleteUserFromRole: {
    controllerName: root + '/assign-users-roles/{id}',
    queryKeyName: ' DETELE_USER_FROM_ROLE',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default screenGroup;
