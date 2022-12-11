import { RequestBodyType, RequestMethod } from '../../request';
const prefix = 'master_data';
const department = {
  createDepartment: {
    controllerName: prefix + '/department/create',
    queryKeyName: 'CREATE_DEPARTMENT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getAllDepartment: {
    controllerName: prefix + '/department/list',
    queryKeyName: 'GET_ALL_DEPARTMENT_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  updateDepartment: {
    controllerName: prefix + '/department/{id}/update',
    queryKeyName: 'UPDATE_DEPARTMENT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteDepartment: {
    controllerName: prefix + '/department/{id}/delete',
    queryKeyName: 'DELETE_DEPARTMENT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  filterprovinceListByDepartmentId: {
    controllerName: prefix + '/department/filter/list',
    queryKeyName: 'FILTER_PROVINCE_LIST_BY_DEPARTMENT_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};
export default department;
