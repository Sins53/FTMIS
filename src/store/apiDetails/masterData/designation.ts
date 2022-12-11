import { RequestBodyType, RequestMethod, screenPrefix } from '../request';

const designation = {
  getAllDesignation: {
    controllerName: screenPrefix.masterData + '/designation/list',
    queryKeyName: 'GET_ALL_DESIGNATION_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createDesignation: {
    controllerName: screenPrefix.masterData + '/designation/create',
    queryKeyName: 'CREATE_DESIGNATION',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editDesignation: {
    controllerName: screenPrefix.masterData + '/designation/{id}/update',
    queryKeyName: 'EDIT_DESIGNATION',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteDesignation: {
    controllerName: screenPrefix.masterData + '/designation/{id}/delete',
    queryKeyName: 'DELETE_DESIGNATION',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default designation;
