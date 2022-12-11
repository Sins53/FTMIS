import { RequestBodyType, RequestMethod, screenPrefix } from '../request';

const selfEmployment = {
  getSelfEmploymentList: {
    controllerName: screenPrefix.masterData + '/self-employment/list',
    queryKeyName: 'GET_ALL_SELF_EMPLOYMENT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createSelfEmploymentItem: {
    controllerName: screenPrefix.masterData + '/self-employment/create',
    queryKeyName: 'CREATE_SELF_EMPLOYMENT_ITEM',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editSelfEmploymentItem: {
    controllerName: screenPrefix.masterData + '/self-employment/{id}/update',
    queryKeyName: 'EDIT_SELF_EMPLOYMENT_ITEM',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteSelfEmploymentItem: {
    controllerName: screenPrefix.masterData + '/self-employment/{id}/delete',
    queryKeyName: 'DELETE_SELF_EMPLOYMENT_ITEM',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default selfEmployment;
