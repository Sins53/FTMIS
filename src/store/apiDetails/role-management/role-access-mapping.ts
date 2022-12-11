import { RequestBodyType, RequestMethod } from '../request';

const roleAccessMapping = {
  getPrivilageByMenuIdRoleId: {
    controllerName: '/users/menu-role-privilege-active/menu/{menuId}/role/{roleId}',
    queryKeyName: 'GET_PRIVILEGE_BY_ROLE_ID_MENU_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default roleAccessMapping;
