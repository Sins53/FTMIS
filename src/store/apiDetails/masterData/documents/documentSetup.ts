import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'document_management';

const documentSetup = {
  getAllDocument: {
    controllerName: prefix + '/document/list',
    queryKeyName: 'GET_ALL_DOCUMENT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createDocument: {
    controllerName: prefix + '/document/create',
    queryKeyName: 'CREATE_DOCUMENT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editDocument: {
    controllerName: prefix + '/document-setup/{id}/update',
    queryKeyName: 'EDIT_DOCUMENT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteDocument: {
    controllerName: prefix + '/document/{id}/delete',
    queryKeyName: 'DELETE_DOCUMENT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  toggleMinimumDocument: {
    controllerName: prefix + '/assign/minimal-document/{id}',
    queryKeyName: 'TOGGLE_DOCUMENT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

export default documentSetup;
