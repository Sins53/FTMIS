import { RequestBodyType, RequestMethod } from "../../request";

const prefix = 'document_management';

const documentCategory = {
  getAllDocumentCategory: {
    controllerName: prefix + '/document-category/list',
    queryKeyName: 'GET_ALL_DOCUMENTCATEGORY_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default documentCategory;
