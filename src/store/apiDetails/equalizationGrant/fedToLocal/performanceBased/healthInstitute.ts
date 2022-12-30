import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-delivery-at-health-institute';

const healthInstitute = {
  getFedToLocalHealthInstituteDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_HEALTH_INSTITUTE_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalHealthInstituteData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_HEALTH_INSTITUTE',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalHealthInstituteListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_HEALTH_INSTITUTE_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalHealthInstituteData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_HEALTH_INSTITUTE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default healthInstitute;
