import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-reporting-projection';

const reportingToMof = {
  getFedToLocalReportingToMofDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_REPORTING_TO_MOF_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalReportingToMofData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_REPORTING_TO_MOF',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalReportingToMofListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_REPORTING_TO_MOF_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalReportingToMofData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_REPORTING_TO_MOF_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default reportingToMof;
