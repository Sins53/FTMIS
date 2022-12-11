import { RequestBodyType, RequestMethod } from './request';

const endPoint = '/requisition';
const requisition = {
  getRequisitions: {
    controllerName: endPoint,
    queryKeyName: 'GET_ALL_REQUISITION',
    requestBody: RequestBodyType.AUTH
  },
  getRequisitionDetailById: {
    controllerName: endPoint + '/{id}',
    queryKeyName: 'GET_REQUISITION_BY_ID',
    requestBody: RequestBodyType.AUTH
  },
  editRequisitionById: {
    controllerName: endPoint + '/{id}',
    queryKeyName: 'EDIT_REQUISITION_BY_ID',
    requestBody: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },

  createRequisition: {
    controllerName: endPoint,
    queryKeyName: 'CREATE_REQUISITION_BY_ID',
    requestBody: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },

  deleteRequisitionById: {
    controllerName: endPoint + '/{id}',
    queryKeyName: 'DELETE_REQUISITION',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },

  getRequisitionForApproval: {
    controllerName: endPoint + '/list/{status}',
    queryKeyName: 'GET_ALL_REQUISITION_FOR_APPROVAL',
    requestBody: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  approveRejectRequisition: {
    controllerName: endPoint + '/change-status/{id}',
    queryKeyName: 'APPROVE_REJECT_REQUISITION',
    requestBody: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default requisition;
