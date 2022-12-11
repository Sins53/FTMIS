import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'document_management';

const documentGroups = {
  getAllDocumentGroup: {
    controllerName: prefix + '/document-group/list',
    queryKeyName: 'GET_ALL_DOCUMENTGROUP_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createDocumentGroup: {
    controllerName: prefix + '/document-group/create',
    queryKeyName: 'CREATE_DOCUMENTGROUP',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editDocumentGroup: {
    controllerName: prefix + '/document-group/{id}/update',
    queryKeyName: 'EDIT_DOCUMENTGROUP',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteDocumentGroup: {
    controllerName: prefix + '/document-group/{id}/delete',
    queryKeyName: 'DELETE_DOCUMENTGROUP',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  getAllDocumentChildGroup: {
    controllerName: prefix + '/document-group/list',
    queryKeyName: 'GET_ALL_DOCUMENTGROUP_CHILD_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default documentGroups;
