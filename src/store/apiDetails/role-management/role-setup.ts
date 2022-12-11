import { RequestBodyType, RequestMethod } from '../request';

const prefix = 'users/role';
const roleSetup = {
  createRole: {
    controllerName: prefix + '/create',
    queryKeyName: 'CREATE_ROLE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getAllRole: {
    controllerName: prefix + '/list',
    queryKeyName: 'GET_ALL_ROLE_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getRoleDetailByRoleId: {
    controllerName: prefix + '/{id}',
    queryKeyName: 'GET_ROLE_DETAIL_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  updateRole: {
    controllerName: prefix + '/{id}/update',
    queryKeyName: 'UPDATE_ROLE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteRoleById: {
    controllerName: prefix + '/{id}/delete',
    queryKeyName: 'DELETE_ROLE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};
export default roleSetup;
