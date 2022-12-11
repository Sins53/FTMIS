import { RequestBodyType, RequestMethod } from './request';

const authentication = {
  refreshToken: {
    controllerName: 'token/refresh/',
    queryKeyName: 'GET_REFRESH_TOKEN',
    requestMethod: RequestMethod.GET
  },
  logout: {
    controllerName: '/users/logout',
    queryKeyName: 'SINGLE_DEVICE_LOGOUT',
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.AUTH
  },
  logoutFromAllDevices: {
    controllerName: '/users/logout-all-devices',
    queryKeyName: 'MULTIPLE_DEVICE_LOGOUT',
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.AUTH
  }
};

const userDetail = {
  getUserDetail: {
    controllerName: '/users/init',
    queryKeyName: 'GET_USER_DETAIL',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getUserList: {
    controllerName: '/user-detail',
    queryKeyName: 'GET_USER_LIST',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getUserById: {
    controllerName: '/user-detail/{userid}:',
    queryKeyName: 'GET_USER_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  changePassword: {
    controllerName: '/users/change-password/{userId}',
    queryKeyName: 'CHANGE_PASSWORD_BY_USERID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

const RoleDetails = {
  addUserRole: {
    controllerName: '/user-role/add',
    queryKeyName: 'ADD_USER_ROLE',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

const UserScreenGroup = {
  getScreenByUserId: {
    controllerName: '/users/menu-user-privilege/user/{id}',
    queryKeyName: 'GET_SCREEN_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createScreens: {
    controllerName: 'users/assign-menus-role-user',
    queryKeyName: 'CREATE_SCREEN',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  addEditScreen: {
    controllerName: 'users/assign-menu-user',
    queryKeyName: 'ADD_EDIT_SCREEN',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

const UserAccessMapping = {
  getPrivilageByMenuIdUserId: {
    controllerName: '/users/menu-user-privilege-active/menu/{menuId}/user/{userId}',
    queryKeyName: 'GET_PRIVILEGE_BY_USER_ID_MENU_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },

  deleteScreenByMenuIdUserId: {
    controllerName: '/users/menu-user-privilege-active/menu/{menuId}/user/{userId}',
    queryKeyName: 'DELETE_SCREEN_BY_USER_ID_MENU_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

const userManagement = {
  authentication,
  userDetail,
  RoleDetails,
  UserScreenGroup,
  UserAccessMapping
};
export default userManagement;
