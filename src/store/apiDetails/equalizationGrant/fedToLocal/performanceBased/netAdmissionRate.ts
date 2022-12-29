import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-net-admission-rate';

const netAdmissionRate = {
  getFedToLocalNetAdmissionRateDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_NET_ADMISSION_RATE_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalNetAdmissionRateData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_NET_ADMISSION_RATE',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalNetAdmissionRateListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_NET_ADMISSION_RATE_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalNetAdmissionRateData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_NET_ADMISSION_RATE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default netAdmissionRate;
