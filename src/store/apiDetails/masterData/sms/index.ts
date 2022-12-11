import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'master_data';

const smsSettings = {
  getAllSmsVendors: {
    controllerName: prefix + '/sms-service',
    queryKeyName: 'GET_ALL_SMS_VENDORS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  toggleSmsStatus: {
    controllerName: prefix + '/sms-service/activate/{id}',
    queryKeyName: 'TOGGLE_ELIGIBILITY_CRITERIA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  addNewSmsVendor: {
    controllerName: prefix + '/sms-service',
    queryKeyName: 'ADD_NEW_SMS_VENDOR',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editSmsVendor: {
    controllerName: prefix + '/sms-service/{id}',
    queryKeyName: 'EDIT_SMS_VENDOR',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteSmsVendor: {
    controllerName: prefix + '/sms-service/{id}',
    queryKeyName: 'DELETE_SMS_VENDOR',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default smsSettings;
