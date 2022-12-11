import { RequestBodyType, RequestMethod } from "../../request";

const prefix = 'document_management';

const documentControls = {
  getAllIndividualDocumentControl: {
    controllerName: prefix + '/individual-document-control/list',
    queryKeyName: 'GET_ALL_DOCUMENT_INDIVIDUAL_CONTROL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getAllInstitutionalDocumentControl: {
    controllerName: prefix + '/institutional-document-control/list',
    queryKeyName: 'GET_ALL_DOCUMENT_INSTITUTIONAL_CONTROL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  toggleDocumentControl: {
    controllerName: prefix + '/document-control/assign/requirement-condition/{id}',
    queryKeyName: 'TOGGLE_ALL_DOCUMENT_CONTROL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getAllIndividualDocumentSubCategoryGroupList:{
    controllerName: prefix + '/individual/sub_category/',
    queryKeyName: 'GET_ALL_DOCUMENT_INDIVIDUAL_SUBGROUP_CONTROL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getAllInstitutionalDocumentSubCategoryGroupList:{
    controllerName: prefix + '/institutional/sub_category/',
    queryKeyName: 'GET_ALL_DOCUMENT_INSTITUTIONAL_SUBGROUP_CONTROL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default documentControls;
