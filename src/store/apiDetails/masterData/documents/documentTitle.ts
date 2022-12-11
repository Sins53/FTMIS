import { RequestBodyType, RequestMethod } from "../../request";

const prefix = 'document_management';

const documentTitle = {
  getAllDocumentTitle: {
    controllerName: prefix + '/document-title/list',
    queryKeyName: 'GET_ALL_DOCUMENT_TITLE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createDocumentTitle: {
    controllerName: prefix + '/document-title/create',
    queryKeyName: 'CREATE_DOCUMENT_TITLE',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editDocumentTitle: {
    controllerName: prefix + '/document-title/{id}/update',
    queryKeyName: 'EDIT_DOCUMENT_TITLE',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteDocumentTitle: {
    controllerName: prefix + '/document-title/{id}/delete',
    queryKeyName: 'DELETE_DOCUMENT_TITLE',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default documentTitle;
